import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  projectName: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}
