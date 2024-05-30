import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { User } from '../models/user.model';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userDetails: Partial<User>) {
    const newUser = await this.registerService.register(userDetails);
    return newUser;
  }
}
