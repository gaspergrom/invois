import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

config();

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:9001/callback/facebook',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user: Partial<User> & { token: string } = {
      email: emails[0].value,
      name: name.givenName,
      lastName: name.familyName,
      profilePhoto: photos.length ? photos[0].value : null,
      token: accessToken,
    };
    done(null, user);
  }
}
