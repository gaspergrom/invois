import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../shared/services/email.service';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';

describe('Auth Service', () => {
  let service: AuthService;

  const jwtService = {
    sign: jest.fn(),
  };

  const emailService = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        { provide: AuthRepository, useValue: {} },
        { provide: JwtService, useValue: jwtService },
        { provide: EmailService, useValue: emailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
