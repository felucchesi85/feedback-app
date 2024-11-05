import { User } from '../../domain/entities/User';

export class InMemoryUserRepository {
  private users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}

export const userRepository = new InMemoryUserRepository(); 