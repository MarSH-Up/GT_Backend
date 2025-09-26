import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuth } from 'src/auth/auth.decorator';
import { UserAccessLevel } from 'src/auth/entities/auth.entity';
import { CurrentUser } from './currentUser.decorator';
import { ICurrentUser } from './entities/current.user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User, UserBrief } from './types/user.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @AccessAuth(
    UserAccessLevel.ADMIN,
    UserAccessLevel.USER,
    UserAccessLevel.THERAPIST,
    UserAccessLevel.DOCTOR,
  )
  profile(@CurrentUser() currentUser: ICurrentUser): Promise<UserBrief> {
    return this.userService.profile(currentUser);
  }

  @Post()
  @AccessAuth(UserAccessLevel.ADMIN)
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    return this.userService.create(createUserDto, currentUser);
  }

  @Get('all')
  @AccessAuth(UserAccessLevel.ADMIN)
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Patch('profile')
  @AccessAuth(UserAccessLevel.ADMIN)
  updateProfile(
    @Body() updateUserDto: UpdateUser,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<User> {
    return this.userService.updateProfile(updateUserDto, currentUser.userId);
  }

  @Delete(':userId')
  @AccessAuth(UserAccessLevel.ADMIN)
  deleteUser(@Param('userId') userId: string): Promise<void> {
    return this.userService.deleteUser(userId);
  }
}
