import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthLoginDto } from './dto/request/login.dto';
import { AuthRegisterDto } from './dto/request/register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenDto } from './dto/response/token.dto';
import { AuthUpdateDto } from './dto/request/update.dto';
import * as bcrypt from 'bcrypt';
import { EmailService, EmailTemplates } from '../shared/services/email.service';
import { ConfigService } from '@nestjs/config';
import * as randtoken from 'rand-token';
import { ResetPasswordDto } from './dto/request/reset-password.dto';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { AuthData } from '../shared/models/AuthData';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private jwtTokenService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async login(loginData: AuthLoginDto): Promise<AuthTokenDto> {
    const user = await this.repo.findOneBy({ email: loginData.email });
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtTokenService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profilePhoto: user.profilePhoto,
    });
    return { token };
  }

  async register(registerData: AuthRegisterDto): Promise<User> {
    const user = await this.repo.findOneBy({ email: registerData.email });
    if (user) {
      throw new UnprocessableEntityException('User already exists');
    }
    const password = await bcrypt.hash(registerData.password, 12);
    const data = {
      ...registerData,
      password,
    };
    return this.repo.save(data);
  }

  async update(userId: string, updateData: AuthUpdateDto): Promise<User> {
    await this.repo.update(userId, updateData);
    return await this.repo.findOneByOrFail({
      id: userId,
    });
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.repo.findOneBy({ email });
    if (!user) {
      return true;
    }
    const token = randtoken.generate(20);
    await this.repo.update(user.id, {
      resetToken: token,
    });
    const url = `${this.configService.get<string>(
      'APP_URL',
    )}/reset-password?token=${token}`;
    const emailSent = await this.emailService.send(
      {
        to: email,
        subject: 'Forgot password',
      },
      EmailTemplates.FORGOT_PASSWORD,
      {
        url,
      },
    );
    if (!emailSent) {
      throw Error('There was an error sending forgot password email.');
    }
    return emailSent;
  }

  async verifyResetPasswordToken(token: string): Promise<boolean> {
    const user = await this.repo.findOneBy({ resetToken: token });
    if (!user) {
      throw new NotFoundException('Invalid token');
    }
    return true;
  }

  async resetPassword(data: ResetPasswordDto): Promise<boolean> {
    const user = await this.repo.findOneBy({ resetToken: data.token });
    if (!user) {
      throw new NotFoundException('Invalid token');
    }
    const password = await bcrypt.hash(data.password, 12);
    await this.repo.update(user.id, {
      resetToken: null,
      password,
    });
    return true;
  }

  async changePassword(
    data: ChangePasswordDto,
    auth: AuthData,
  ): Promise<boolean> {
    const user = await this.repo.findOneByOrFail({ email: auth.email });
    const passwordMatch = await bcrypt.compare(data.oldPassword, user.password);
    if (!passwordMatch) {
      throw new NotFoundException('Invalid old password');
    }
    const password = await bcrypt.hash(data.password, 12);
    await this.repo.update(user.id, {
      password,
    });
    return true;
  }

  async socialLogin(data: Partial<User>, token: string): Promise<AuthTokenDto> {
    let user = await this.repo.findOneBy({ email: data.email });
    if (!user) {
      user = await this.repo.save(data);
    }
    token = this.jwtTokenService.sign({
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      profilePhoto: user.profilePhoto,
    });
    return { token };
  }
}
