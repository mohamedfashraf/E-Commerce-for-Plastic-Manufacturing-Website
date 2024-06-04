// login/login.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async loginByEmail(email: string, password: string): Promise<string> {
    // Here, you would typically validate the email and password against your database or any other authentication mechanism
    // For simplicity, let's assume valid email and password
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token upon successful login
    const token = this.jwtService.sign({ email: user.email });
    return token;
  }
}
