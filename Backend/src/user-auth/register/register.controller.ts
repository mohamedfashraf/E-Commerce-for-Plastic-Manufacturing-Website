import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { EmailService } from '../email/email.service';
import { User } from '../models/user.model';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly emailService: EmailService,
  ) {}

  @Post()
  async registerUser(@Body() userDetails: Partial<User>) {
    const newUser = await this.registerService.register(userDetails);
    await this.emailService.sendVerificationEmail(newUser);
    return newUser; // Or whatever response you want to send back
  }
}
