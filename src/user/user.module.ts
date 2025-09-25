import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordService } from 'src/auth/password.service';
import { UserRepository } from './user.repository';
import { PrismaUserRepository } from './repositories/prisma-user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
