import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@Controller('auth')
export class UserAuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.loginService.login(username, password);
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.registerService.register(username, password);
  }
}
