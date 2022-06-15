import { AxiosInstance } from 'axios';
import { AuthLoginData, AuthRegisterData, User } from '~/components/features/auth/auth.model';

export class AuthApiService {
  baseUrl: string = '';

  constructor(private http: AxiosInstance) {
    this.baseUrl = process.env.apiUrl || '';
  }

  login(data: AuthLoginData): Promise<{ token: string }> {
    return this.http.post('/auth/login', data);
  }

  register(data: AuthRegisterData): Promise<void> {
    return this.http.post('/auth/register', data);
  }

  getUser(): Promise<User | null> {
    return this.http.get('/auth/user');
  }

  updateUser(data: Partial<User>): Promise<User | null> {
    return this.http.patch('/auth/user', data);
  }

  forgotPassword(email: string): Promise<void> {
    return this.http.post('/auth/forgot-password', { email });
  }

  verifyResetPasswordToken(token: string): Promise<void> {
    return this.http.get('/auth/token', {
      params: {
        token,
      },
    });
  }

  resetPassword(token: string, password: string): Promise<void> {
    return this.http.post('/auth/reset-password', {
      token,
      password,
    });
  }

  changePassword(oldPassword: string, password: string): Promise<void> {
    return this.http.post('/auth/change-password', {
      oldPassword,
      password,
    });
  }

  socialLogin(platform: string) {
    window.open(`${this.baseUrl}auth/${platform}`, '_self');
  }

  socialLoginCallback(platform: string, params: any): Promise<{ token: string }> {
    return this.http.get(`/auth/${platform}/callback`, {
      params,
    });
  }
}
