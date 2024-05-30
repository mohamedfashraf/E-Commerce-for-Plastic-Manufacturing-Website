import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async register(userDetails: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userDetails);
    return await newUser.save();
  }
}
