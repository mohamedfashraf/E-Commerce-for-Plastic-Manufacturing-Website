// user-auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { User } from './models/user.model';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async registerUser(@Body() user: User) {
    return this.registerService.register(user);
  }
}
