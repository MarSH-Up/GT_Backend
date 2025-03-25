import { UpdateUser } from './dto/update-user.dto';
import { User } from './types/user.type';

export abstract class UserRepository {
  abstract create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract findById(id: string): Promise<User>;
  abstract update(updateUserDto: UpdateUser, userId: string): Promise<User>;
}
