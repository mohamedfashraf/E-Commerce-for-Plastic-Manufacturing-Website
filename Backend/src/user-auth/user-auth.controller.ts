// user-auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { User } from './models/user.model';
import { LoginService } from './login/login.service'; // Import LoginService
import { PasswordResetService } from './login/password-reset.service'; // Import PasswordResetService

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly registerService: RegisterService, private readonly loginService: LoginService,
    private readonly passwordResetService: PasswordResetService // Inject PasswordResetService

  ) {}

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
  @Post('reset-password/request') // Define the endpoint to request password reset
  async requestPasswordReset(@Body() payload: { email: string }) {
    const { email } = payload;
    return this.passwordResetService.requestPasswordReset(email);
  }

  @Post('reset-password') // Define the endpoint to reset password
  async resetPassword(@Body() payload: { token: string; newPassword: string }) {
    const { token, newPassword } = payload;
    return this.passwordResetService.resetPassword(token, newPassword);
  }
}
