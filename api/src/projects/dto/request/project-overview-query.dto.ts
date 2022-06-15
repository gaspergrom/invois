import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProjectOverviewQueryDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;

  @IsString()
  @IsOptional()
  searchQuery?: string;
}
