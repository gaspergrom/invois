import { IsOptional, IsString } from 'class-validator';
import { ClientDto } from '../client.dto';

export class CreateClientDto implements Partial<ClientDto> {
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  address2?: string;

  @IsOptional()
  @IsString()
  addressCity?: string;

  @IsOptional()
  @IsString()
  addressPostCode?: string;

  @IsOptional()
  @IsString()
  addressState?: string;

  @IsOptional()
  @IsString()
  taxIdLabel?: string;

  @IsOptional()
  @IsString()
  taxIdNumber?: string;

  @IsOptional()
  @IsString()
  contactName?: string;

  @IsString()
  contactEmail: string;
}
