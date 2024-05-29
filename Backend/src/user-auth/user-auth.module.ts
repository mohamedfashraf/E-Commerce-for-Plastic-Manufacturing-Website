import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // Other imports if any
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, LoginService, RegisterService],
})
export class UserAuthModule {}
