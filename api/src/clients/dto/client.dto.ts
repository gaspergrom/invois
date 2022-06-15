import { UserDto } from '../../auth/dto/user.dto';
import {ProjectDto} from '../../projects/dto/project.dto';

export interface ClientDto {
  id: string;
  companyName: string;
  country?: string;
  address: string;
  address2?: string;
  addressCity?: string;
  addressPostCode?: string;
  addressState?: string;
  taxIdLabel?: string;
  taxIdNumber?: string;
  contacts: ClientContactDto[];
  userId?: string;
  user?: UserDto;
  projects?: ProjectDto[]
}

export interface ClientContactDto {
  name?: string;
  email: string;
  phoneNumber?: string;
}
