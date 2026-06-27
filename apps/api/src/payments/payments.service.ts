import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

const INSPECTION_FEE_NAIRA = 5000;
const PAYSTACK_INITIALIZE_URL =
  'https://api.paystack.co/transaction/initialize';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private prisma: PrismaService) {}

  async initializeInspectionPayment(inspectionId: string, userId: string) {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: {
        tenant: { select: { email: true } },
      },
    });

    if (!inspection) {
      throw new NotFoundException('Inspection not found');
    }

    if (inspection.tenantId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to pay for this inspection',
      );
    }

    if (inspection.paymentStatus === 'PAID') {
      throw new BadRequestException('Inspection is already paid');
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      throw new InternalServerErrorException('Payment provider is not configured');
    }

    const reference = `rentwise_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    await this.prisma.payment.create({
      data: {
        userId,
        inspectionId,
        amount: INSPECTION_FEE_NAIRA,
        type: 'INSPECTION_FEE',
        reference,
      },
    });

    try {
      const response = await axios.post(
        PAYSTACK_INITIALIZE_URL,
        {
          email: inspection.tenant.email,
          amount: INSPECTION_FEE_NAIRA * 100,
          reference,
          metadata: {
            inspectionId,
            userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return {
        authorization_url: response.data.data.authorization_url,
        reference,
      };
    } catch {
      throw new InternalServerErrorException(
        'Failed to initialize payment with Paystack',
      );
    }
  }

  async handlePaystackWebhook(
    rawBody: Buffer | undefined,
    signature: string | undefined,
    body: Record<string, unknown>,
  ) {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      this.logger.error('PAYSTACK_SECRET_KEY is not configured');
      throw new InternalServerErrorException('Payment provider is not configured');
    }

    const payload = rawBody ?? Buffer.from(JSON.stringify(body));
    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(payload)
      .digest('hex');

    if (!signature || hash !== signature) {
      this.logger.warn('Paystack webhook signature verification failed');
      throw new UnauthorizedException('Invalid webhook signature');
    }

    const event = body?.event as string | undefined;
    if (event !== 'charge.success') {
      this.logger.log(`Ignoring Paystack event: ${event ?? 'unknown'}`);
      return { received: true };
    }

    const data = body.data as Record<string, unknown> | undefined;
    const reference = data?.reference as string | undefined;
    const metadata = data?.metadata as Record<string, unknown> | undefined;
    const inspectionId = metadata?.inspectionId as string | undefined;

    this.logger.log(
      `Processing charge.success for reference=${reference ?? 'unknown'}`,
    );

    if (!reference) {
      this.logger.warn('Paystack webhook missing payment reference');
      return { received: true };
    }

    const payment = await this.prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      this.logger.warn(`No payment record found for reference=${reference}`);
      return { received: true };
    }

    const resolvedInspectionId = inspectionId ?? payment.inspectionId;
    if (!resolvedInspectionId) {
      this.logger.warn(
        `No inspection linked to payment reference=${reference}`,
      );
      return { received: true };
    }

    const inspection = await this.prisma.inspection.findUnique({
      where: { id: resolvedInspectionId },
    });

    if (!inspection) {
      this.logger.warn(`Inspection not found: ${resolvedInspectionId}`);
      return { received: true };
    }

    if (inspection.paymentStatus === 'PAID') {
      this.logger.log(
        `Inspection ${resolvedInspectionId} already PAID, skipping`,
      );
      return { received: true };
    }

    await this.prisma.payment.update({
      where: { reference },
      data: { status: 'SUCCESS' },
    });

    await this.prisma.inspection.update({
      where: { id: resolvedInspectionId },
      data: { paymentStatus: 'PAID' },
    });

    this.logger.log(
      `Inspection ${resolvedInspectionId} marked PAID for reference=${reference}`,
    );

    return { received: true };
  }
}
