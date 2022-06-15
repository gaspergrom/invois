import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

interface AuthSettings {
  optional?: boolean;
}

class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(_1: any, user: any) {
    return user || undefined;
  }
}

export const AuthUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export const Auth = (settings: AuthSettings = {}) =>
  applyDecorators(
    UseGuards(settings.optional ? OptionalJwtAuthGuard : AuthGuard('jwt')),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
