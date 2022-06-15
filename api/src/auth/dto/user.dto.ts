import { ClientDto } from '../../clients/dto/client.dto';

export interface UserDto {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  profilePhoto?: string;
  resetToken?: string;
  clients?: ClientDto[];
}
