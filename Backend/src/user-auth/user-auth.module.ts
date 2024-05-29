import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';

@Module({
  controllers: [UserAuthController],
  providers: [UserAuthService, LoginService, RegisterService]
})
export class UserAuthModule {}
