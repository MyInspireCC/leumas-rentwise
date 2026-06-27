import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingsService } from './listings.service';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createListing(@Body() dto: CreateListingDto, @Req() req) {
    return this.listingsService.createListing(req.user.id, dto);
  }

  @Get()
  getAllListings() {
    return this.listingsService.getAllListings();
  }

  @Get(':id')
  getListingById(@Param('id') id: string) {
    return this.listingsService.getListingById(id);
  }
}
