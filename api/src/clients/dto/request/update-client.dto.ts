import { IsOptional, IsString } from 'class-validator';
import { ClientContactDto, ClientDto } from '../client.dto';

export class UpdateClientDto implements Partial<ClientDto> {
  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
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
  contacts: ClientContactDto[];
}
