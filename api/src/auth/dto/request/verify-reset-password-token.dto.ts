import { IsString } from 'class-validator';

export class VerifyResetPasswordTokenDto {
  @IsString()
  token: string;
}
