// user-auth.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthController } from './user-auth.controller';
import { RegisterService } from './register/register.service';
import { User, UserSchema } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import * as crypto from 'crypto'; // Import crypto module
import { LoginService } from './login/login.service'; // Import LoginService

// Generate secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Log the generated secret key
console.log(`Generated Secret Key: ${secretKey}`);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserAuthController],
  providers: [RegisterService, LoginService], // Add LoginService to providers
})
export class UserAuthModule {}
