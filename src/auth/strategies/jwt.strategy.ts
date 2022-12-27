import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from '../interfaces';

import { User } from '../entities/auth.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userModel.findOne({ id });

    if (!user) throw new UnauthorizedException('Invalid Token');
    if (!user.isActive)
      throw new UnauthorizedException(
        'Inactive User, communicate with any administrator',
      );
    return user;
  }
}
