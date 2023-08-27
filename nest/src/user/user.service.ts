import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import compareHash from './tools/bcrypt/compare';
import UserAuthData from './dto/user-auth.dto';
import createTokens, { ReturnTokens } from './tools/jwt/createTokens';
import createHash from './tools/bcrypt/hash';
import { compareSync, hashSync } from 'bcrypt';
import verify from './tools/jwt/verify';
import RefreshToken from './tools/jwt/types/refresh-token.type';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(loginData: UserAuthData): Promise<ReturnTokens> {
    const userDB = await this.userModel
      .findOne({ login: loginData.login })
      .exec();
    if (!userDB) {
      throw new UnauthorizedException(`User ${loginData.login} not found`);
    }
    const isPassCorect = compareSync(loginData.password, userDB.password);
    if (!isPassCorect) {
      throw new UnauthorizedException('Uncorrect password');
    }
    const { _id, role, login } = userDB;
    const tokens = await createTokens({ _id: _id.toString(), role, login });
    userDB.refreshTokens.push(tokens.refreshToken);
    console.log(userDB);
    await userDB.save();
    return tokens;
  }

  async register(registerData: UserAuthData): Promise<boolean> {
    const userDB = await this.userModel.findOne({ login: registerData.login });
    if (userDB) {
      throw new UnauthorizedException(
        `User ${registerData.login} already exist`,
      );
    }
    registerData.password = hashSync(registerData.password, 8);
    console.log(registerData);

    return this.userModel
      .create(registerData)
      .then(() => {
        return true;
      })
      .catch((err) => {
        throw new UnauthorizedException(err);
      });
  }

  async refresh(refreshToken: string): Promise<ReturnTokens> {
    console.log(process.env.JWT_SECRET);
    let originalTokenData = verify<RefreshToken>(refreshToken);
    const userDB = await this.userModel
      .findOne({ _id: originalTokenData._id })
      .exec();
    const { _id, role, login } = userDB;
    const tokens = await createTokens({ _id: _id.toString(), role, login });
    console.log(userDB.refreshTokens);

    const tokenIndx = userDB.refreshTokens.indexOf(refreshToken);
    if (tokenIndx === -1)
      throw new UnauthorizedException('Invalid refresh token');
    userDB.refreshTokens[tokenIndx] = tokens.refreshToken;
    await userDB.save();
    return tokens;
  }
}
