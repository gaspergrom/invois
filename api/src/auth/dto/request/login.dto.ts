import { IsEmail, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class AuthLoginDto implements Partial<UserDto> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
