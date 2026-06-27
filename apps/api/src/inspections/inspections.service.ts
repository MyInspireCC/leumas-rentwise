import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';

@Injectable()
export class InspectionsService {
  constructor(private prisma: PrismaService) {}

  async requestInspection(tenantId: string, dto: CreateInspectionDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: dto.listingId },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.ownerId === tenantId) {
      throw new ForbiddenException('You cannot inspect your own listing');
    }

    return this.prisma.inspection.create({
      data: {
        tenantId,
        listingId: dto.listingId,
        scheduledTime: dto.scheduledTime
          ? new Date(dto.scheduledTime)
          : undefined,
      },
      include: { listing: true },
    });
  }

  getTenantInspections(tenantId: string) {
    return this.prisma.inspection.findMany({
      where: { tenantId },
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  getListingOwnerInspections(ownerId: string) {
    return this.prisma.inspection.findMany({
      where: {
        listing: { ownerId },
      },
      include: {
        listing: true,
        tenant: {
          select: { id: true, name: true, email: true, phone: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async acceptInspection(inspectionId: string, ownerId: string) {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: { listing: true },
    });

    if (!inspection) {
      throw new NotFoundException('Inspection not found');
    }

    if (inspection.listing.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the listing owner can accept this inspection',
      );
    }

    return this.prisma.inspection.update({
      where: { id: inspectionId },
      data: { status: 'ACCEPTED' },
    });
  }

  async rejectInspection(inspectionId: string, ownerId: string) {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: { listing: true },
    });

    if (!inspection) {
      throw new NotFoundException('Inspection not found');
    }

    if (inspection.listing.ownerId !== ownerId) {
      throw new ForbiddenException(
        'Only the listing owner can reject this inspection',
      );
    }

    return this.prisma.inspection.update({
      where: { id: inspectionId },
      data: { status: 'REJECTED' },
    });
  }
}
