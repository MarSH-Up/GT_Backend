import { User } from '../types/user.type';

export class UserSerializer {
  static toSafeUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      therapistId: user.therapistId,
      age: user.age,
      institution: user.institution,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
    };
  }
}
