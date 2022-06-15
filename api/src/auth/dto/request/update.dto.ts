import { IsOptional, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class AuthUpdateDto implements Partial<UserDto> {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  profilePhoto?: string;
}
