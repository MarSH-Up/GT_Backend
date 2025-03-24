import { User } from './types/user.type';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
