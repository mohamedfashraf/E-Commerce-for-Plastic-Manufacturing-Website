import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';

export interface RegisterResponse {
  newUser: User;
  token: string;
}
@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService
    
  ) {}

  async register(userDetails: Partial<User>): Promise<RegisterResponse> {
    const existingUser = await this.userModel.findOne({ email: userDetails.email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    
    const newUser = new this.userModel(userDetails);
    await newUser.save();
    const token = this.jwtToken(newUser);
    return { newUser, token };
  }
    public jwtToken(user: User): string {
    return this.jwtService.sign({ id: user._id });
  }

}
export { JwtService };

