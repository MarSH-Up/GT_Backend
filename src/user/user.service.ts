import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { User } from './types/user.type';
import { UserRepository } from './user.repository';
import { PasswordService } from 'src/auth/password.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    creator: string,
  ): Promise<User> {
    const userValidated = await this.userRepository.findByEmail(userData.email);
    if (userValidated) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordService.hash(userData.password);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
      createdBy: creator,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
