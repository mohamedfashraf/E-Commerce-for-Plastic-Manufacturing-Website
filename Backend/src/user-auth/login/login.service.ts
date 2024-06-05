import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async loginByEmail(email: string, password: string): Promise<string> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // console.log('Found user:', user);
    // console.log('Password provided:', password);
    // console.log('Hashed password in DB:', user.password);

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Is password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // If password is valid, generate and return JWT token
    const payload = { userId: user._id,email: user.email };
    return this.jwtService.sign(payload);
  }
}
