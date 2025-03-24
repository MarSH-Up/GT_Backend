import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AccessAuth } from 'src/auth/auth.decorator';
import { UserAccessLevel } from 'src/auth/entities/auth.entity';
import { CurrentUser } from './currentUser.decorator';
import { ICurrentUser } from './entities/current.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @AccessAuth(UserAccessLevel.ADMIN)
  create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    console.log(currentUser);
    return this.userService.create(createUserDto, currentUser.email);
  }
}
