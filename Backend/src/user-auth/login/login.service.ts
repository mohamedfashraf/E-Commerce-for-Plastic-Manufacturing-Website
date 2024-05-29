import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  private readonly users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
  ];

  async login(username: string, password: string): Promise<any> {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );
    if (user) {
      return { username: user.username, id: user.id };
    }
    return null;
  }
}
