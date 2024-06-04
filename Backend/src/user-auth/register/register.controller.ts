import { Controller, Post, Body } from '@nestjs/common';
import { RegisterResponse, RegisterService } from './register.service';
import { EmailService } from '../email/email.service';
import { User } from '../models/user.model';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userDetails: Partial<User>):Promise<RegisterResponse>  {
    const {newUser,token} = await this.registerService.register(userDetails);
    await this.emailService.sendVerificationEmail(newUser);
    return {newUser,token}; // Or whatever response you want to send back
  }
}
