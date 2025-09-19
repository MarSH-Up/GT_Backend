import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from '../types/user.type';
import { UpdateUser } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class PrismaUserRepository extends UserRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(data: CreateUserDto): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        age: data.age,
        password: data.password,
        createdBy: data.createdBy,
        userAccessLevel: data.userAccessLevel,
        therapistId: data.therapistId,
        institutionId: data.institutionId,
      },
    });

    return {
      id: created.id,
      email: created.email,
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
    } as unknown as User;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user as unknown as User;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      id: Number(user.id),
    })) as unknown as User[];
  }

  async update(updateUserDto: UpdateUser, userId: string): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });

    return {
      ...updated,
      id: Number(updated.id),
    } as unknown as User;
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
