import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secret } from '../constants/jwt.constant';
import { User } from '../entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: User) {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      lastName: payload.lastName,
      profilePhoto: payload.profilePhoto,
    };
  }
}
