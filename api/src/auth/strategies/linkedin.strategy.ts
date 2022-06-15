import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-linkedin-oauth2';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

config();

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_APP_ID,
      clientSecret: process.env.LINKEDIN_APP_SECRET,
      callbackURL: 'http://localhost:9001/callback/linkedin',
      scope: ['r_emailaddress', 'r_liteprofile'],
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
