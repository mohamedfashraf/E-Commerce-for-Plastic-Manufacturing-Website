// user-auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { User } from './models/user.model';
import { LoginService } from './login/login.service'; // Import LoginService

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly registerService: RegisterService, private readonly loginService: LoginService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return this.registerService.register(user);
  }
  @Post('login') // Define the login endpoint
  async loginUser(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    const token = await this.loginService.loginByEmail(email, password); // Use login service
    return { token };
  }
}
