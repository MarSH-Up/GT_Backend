import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { User } from './types/user.type';
import { UserRepository } from './user.repository';
import { PasswordService } from 'src/auth/password.service';
import { ICurrentUser } from './entities/current.user.dto';
import { UserAccessLevel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}
  private readonly logger = new Logger(UserService.name);

  async create(userData: CreateUserDto, creator: ICurrentUser): Promise<User> {
    const userValidated = await this.userRepository.findByEmail(userData.email);
    if (userValidated) {
      throw new BadRequestException('User already exists');
    }

    if (userData.therapistId) {
      const therapist = await this.userRepository.findById(
        userData.therapistId,
      );
      if (!therapist) {
        throw new BadRequestException('Therapist not found');
      }
      if (therapist.userAccessLevel !== UserAccessLevel.THERAPIST) {
        throw new BadRequestException('User is not a therapist');
      }
    }

    const hashedPassword = await this.passwordService.hash(userData.password);
    return this.userRepository.create({
      ...userData,
      password: hashedPassword,
      createdBy: creator.email,
      userAccessLevel: userData.userAccessLevel,
      therapistId: userData.therapistId,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  async profile(currentUser: ICurrentUser): Promise<User> {
    return this.userRepository.findByEmail(currentUser.email);
  }

  async updateProfile(
    updateUserDto: UpdateUser,
    userId: string,
  ): Promise<User> {
    return this.userRepository.update(updateUserDto, userId);
  }
}
