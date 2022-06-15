import { IsEmail, IsString } from 'class-validator';
import { UserDto } from '../user.dto';

export class AuthRegisterDto implements Partial<UserDto> {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
}
