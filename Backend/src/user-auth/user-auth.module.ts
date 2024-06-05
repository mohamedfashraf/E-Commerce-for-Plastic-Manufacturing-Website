import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserAuthController } from './user-auth.controller';
import { RegisterService } from './register/register.service';
import { User, UserSchema } from './models/user.model';
import { LoginService } from './login/login.service';
import { PasswordResetService } from './login/password-reset.service';
import { JwtStrategy } from './login/jwt.strategy'; // Import JwtStrategy

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
  providers: [RegisterService, LoginService, PasswordResetService, JwtStrategy], // Add JwtStrategy to providers
})
export class UserAuthModule {}
