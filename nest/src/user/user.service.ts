import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import compareHash from './tools/bcrypt/compare';
import UserAuthData from './dto/user-auth.dto';
import createTokens, { ReturnTokens } from './tools/jwt/createTokens';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginData: UserAuthData): Promise<ReturnTokens> {
    const userDB = await this.userModel.findOne({ login: loginData }).lean();
    if (!userDB) {
      throw new Error(`User ${loginData.login} not found`);
    }
    const isPassCorect = compareHash(loginData.password, userDB.password);
    if (!isPassCorect) {
      throw new UnauthorizedException();
    }
    const { _id, role, login } = userDB;
    const tokens = createTokens({ _id: _id.toString(), role, login });
    return tokens;
  }
}
