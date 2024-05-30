import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async sendVerificationEmail(user: User): Promise<void> {
    // Logic to send verification email goes here
    // This could involve using a library like nodemailer
    // For simplicity, we'll just log the email address here
    console.log(`Sending verification email to: ${user.email}`);
  }
}
