import { Controller, Post, Body, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuth } from 'src/auth/auth.decorator';
import { UserAccessLevel } from 'src/auth/entities/auth.entity';
import { CurrentUser } from './currentUser.decorator';
import { ICurrentUser } from './entities/current.user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AccessAuth(UserAccessLevel.ADMIN)
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.create(createUserDto, currentUser);
  }

  @Patch('profile')
  @AccessAuth(UserAccessLevel.ADMIN)
  updateProfile(
    @Body() updateUserDto: UpdateUser,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.updateProfile(updateUserDto, currentUser.userId);
  }

  @Get('profile')
  @AccessAuth(UserAccessLevel.ADMIN)
  profile(@CurrentUser() currentUser: ICurrentUser) {
    return this.userService.profile(currentUser);
  }
}
