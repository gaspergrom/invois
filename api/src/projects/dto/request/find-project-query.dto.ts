import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindProjectQueryDto {
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
