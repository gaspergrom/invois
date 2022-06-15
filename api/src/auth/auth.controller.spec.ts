import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/request/login.dto';
import { AuthRegisterDto } from './dto/request/register.dto';
import { ForgotPasswordDto } from './dto/request/forgot-password.dto';
import { VerifyResetPasswordTokenDto } from './dto/request/verify-reset-password-token.dto';
import { ResetPasswordDto } from './dto/request/reset-password.dto';
import { AuthData } from '../shared/models/AuthData';
import { ChangePasswordDto } from './dto/request/change-password.dto';
import { AuthUpdateDto } from './dto/request/update.dto';

describe('Auth Controller', () => {
  const user: AuthData = {
    email: 'gasper.grom@gmail.com',
    id: '1234',
    lastName: 'Grom',
    name: 'Gasper',
    profilePhoto: '',
    token: '123456789',
  };

  let controller: AuthController;
  const service = {
    login: jest.fn(),
    register: jest.fn(),
    update: jest.fn(),
    forgotPassword: jest.fn(),
    verifyResetPasswordToken: jest.fn(),
    resetPassword: jest.fn(),
    changePassword: jest.fn(),
    socialLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', () => {
    const loginData: AuthLoginDto = {
      email: 'gasper.grom@gmail.com',
      password: 'abcd1234',
    };

    controller.login(loginData);

    expect(service.login).toHaveBeenCalledWith(loginData);
  });

  it('should register', () => {
    const registerData: AuthRegisterDto = {
      email: 'gasper.grom@gmail.com',
      password: 'abcd1234',
      name: 'Gasper',
      lastName: 'Grom',
    };

    controller.register(registerData);

    expect(service.register).toHaveBeenCalledWith(registerData);
  });

  it('should forgot password', () => {
    const forgotPasswordData: ForgotPasswordDto = {
      email: 'gasper.grom@gmail.com',
    };

    controller.forgotPassword(forgotPasswordData);

    expect(service.forgotPassword).toHaveBeenCalledWith(
      forgotPasswordData.email,
    );
  });

  it('should verify reset password token', () => {
    const tokenData: VerifyResetPasswordTokenDto = {
      token: 'abcdfg',
    };

    controller.verifyResetPasswordToken(tokenData);

    expect(service.verifyResetPasswordToken).toHaveBeenCalledWith(
      tokenData.token,
    );
  });

  it('should verify reset password token', () => {
    const tokenData: VerifyResetPasswordTokenDto = {
      token: 'abcdfg',
    };

    controller.verifyResetPasswordToken(tokenData);

    expect(service.verifyResetPasswordToken).toHaveBeenCalledWith(
      tokenData.token,
    );
  });

  it('should reset password', () => {
    const resetPasswordData: ResetPasswordDto = {
      token: 'abcdfg',
      password: 'abcd1234',
    };

    controller.resetPassword(resetPasswordData);

    expect(service.resetPassword).toHaveBeenCalledWith(resetPasswordData);
  });

  it('should change password', () => {
    const changePasswordData: ChangePasswordDto = {
      oldPassword: 'abcdfg',
      password: 'abcd1234',
    };

    controller.changePassword(changePasswordData, user);

    expect(service.changePassword).toHaveBeenCalledWith(
      changePasswordData,
      user,
    );
  });

  it('should google login', () => {
    const login = controller.googleLogin();

    expect(login).toBeNull();
  });

  it('should google callback', () => {
    controller.googleCallback(user);

    expect(service.socialLogin).toHaveBeenCalledWith(user, user.token);
  });

  it('should facebook login', () => {
    const login = controller.facebookLogin();

    expect(login).toBeNull();
  });

  it('should facebook callback', () => {
    controller.facebookCallback(user);

    expect(service.socialLogin).toHaveBeenCalledWith(user, user.token);
  });

  it('should linkedin login', () => {
    const login = controller.linkedinLogin();

    expect(login).toBeNull();
  });

  it('should linkedin callback', () => {
    controller.linkedinCallback(user);

    expect(service.socialLogin).toHaveBeenCalledWith(user, user.token);
  });

  it('should get user', () => {
    controller.getUser(user);

    expect(service.socialLogin).toHaveBeenCalledWith(user, user.token);
  });

  it('should update user', () => {
    const updateData: AuthUpdateDto = {
      name: 'Gasper',
      lastName: 'Grom',
    };

    controller.updateUser(updateData, user);

    expect(service.update).toHaveBeenCalledWith(user.id, updateData);
  });
});
