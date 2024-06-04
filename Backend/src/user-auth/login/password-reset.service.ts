// password-reset.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async requestPasswordReset(email: string): Promise<string | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null; // User not found
    }

    // Generate unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Update user with reset token and expiry time
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    // Find user by reset token and ensure it's not expired
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return false; // Token is invalid or expired
    }

    // Hash the new password and update user's password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return true;
  }
}
