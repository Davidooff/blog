import { Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Post } from '@nestjs/common';
import UserAuthData from './dto/user-auth.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  async register(@Body() userAuthData: UserAuthData) {
    return await this.userService.register(userAuthData);
  }

  @Post('/login')
  async login(@Body() userAuthData: UserAuthData) {
    return await this.userService.login(userAuthData);
  }
}
