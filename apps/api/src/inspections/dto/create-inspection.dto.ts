import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInspectionDto {
  @IsString()
  @IsNotEmpty()
  listingId: string;

  @IsOptional()
  @IsDateString()
  scheduledTime?: string;
}
