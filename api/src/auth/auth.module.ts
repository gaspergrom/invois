import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './constants/jwt.constant';
import { AuthController } from './auth.controller';
import { EmailService } from '../shared/services/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, AuthRepository, EmailService, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
