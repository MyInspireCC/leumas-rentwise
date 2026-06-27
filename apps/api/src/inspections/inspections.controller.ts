import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { InspectionsService } from './inspections.service';

@Controller('inspections')
export class InspectionsController {
  constructor(private inspectionsService: InspectionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TENANT')
  @Post()
  requestInspection(@Body() dto: CreateInspectionDto, @Req() req) {
    return this.inspectionsService.requestInspection(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TENANT')
  @Get()
  getTenantInspections(@Req() req) {
    return this.inspectionsService.getTenantInspections(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENT', 'LANDLORD')
  @Get('owner')
  getListingOwnerInspections(@Req() req) {
    return this.inspectionsService.getListingOwnerInspections(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENT', 'LANDLORD')
  @Patch(':id/accept')
  acceptInspection(@Param('id') id: string, @Req() req) {
    return this.inspectionsService.acceptInspection(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('AGENT', 'LANDLORD')
  @Patch(':id/reject')
  rejectInspection(@Param('id') id: string, @Req() req) {
    return this.inspectionsService.rejectInspection(id, req.user.id);
  }
}
