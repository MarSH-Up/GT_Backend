import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '../types/user.type';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const created = await this.prisma.user.create({
      data,
    });

    return {
      ...created,
      id: Number(created.id),
    } as User;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      ...user,
      id: Number(user.id),
    } as User;
  }
}
