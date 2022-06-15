import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { AuthLoginDto } from './dto/request/login.dto';
import { AuthRegisterDto } from './dto/request/register.dto';
import { AuthTokenDto } from './dto/response/token.dto';
import { Auth, AuthUser } from '../shared/decorators/auth.decorator';
import { AuthUpdateDto } from './dto/request/update.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { VerifyResetPasswordTokenDto } from './dto/request/verify-reset-password-token.dto';
import { ResetPasswordDto } from './dto/request/reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { AuthData } from '../shared/models/AuthData';
import {ApiTags} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: AuthLoginDto): Promise<AuthTokenDto> {
    return this.authService.login(body);
  }

  @Post('/register')
  register(@Body() body: AuthRegisterDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('/forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<boolean> {
    return this.authService.forgotPassword(body.email);
  }

  @Get('/token')
  verifyResetPasswordToken(
    @Query() query: VerifyResetPasswordTokenDto,
  ): Promise<boolean> {
    return this.authService.verifyResetPasswordToken(query.token);
  }

  @Post('/reset-password')
  resetPassword(@Body() body: ResetPasswordDto): Promise<boolean> {
    return this.authService.resetPassword(body);
  }

  @Auth()
  @Post('/change-password')
  changePassword(
    @Body() body: ChangePasswordDto,
    @AuthUser() user: AuthData,
  ): Promise<boolean> {
    return this.authService.changePassword(body, user);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return null;
  }

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@AuthUser() user: AuthData) {
    return this.authService.socialLogin(user, user.token);
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  facebookLogin() {
    return null;
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@AuthUser() user: AuthData) {
    return this.authService.socialLogin(user, user.token);
  }

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  linkedinLogin() {
    return null;
  }

  @Get('/linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinCallback(@AuthUser() user: AuthData) {
    return this.authService.socialLogin(user, user.token);
  }

  @Auth()
  @Get('/user')
  getUser(@AuthUser() user: AuthData): AuthData {
    return user;
  }

  @Auth()
  @Patch('/user')
  updateUser(
    @Body() body: AuthUpdateDto,
    @AuthUser() user: AuthData,
  ): Promise<User> {
    return this.authService.update(user.id, body);
  }
}
