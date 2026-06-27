import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
import { PaymentsService } from './payments.service';

type RawBodyRequest = Request & { rawBody?: Buffer };

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TENANT')
  @Post('initialize')
  initializeInspectionPayment(
    @Body() dto: InitializePaymentDto,
    @Req() req,
  ) {
    return this.paymentsService.initializeInspectionPayment(
      dto.inspectionId,
      req.user.id,
    );
  }

  @Post('webhook')
  @HttpCode(200)
  handlePaystackWebhook(
    @Req() req: RawBodyRequest,
    @Headers('x-paystack-signature') signature: string,
  ) {
    return this.paymentsService.handlePaystackWebhook(
      req.rawBody,
      signature,
      req.body,
    );
  }
}
