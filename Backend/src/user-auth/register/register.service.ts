import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  private readonly users = [];

  async register(username: string, password: string): Promise<any> {
    const newUser = { id: this.users.length + 1, username, password };
    this.users.push(newUser);
    return { id: newUser.id, username: newUser.username };
  }
}
