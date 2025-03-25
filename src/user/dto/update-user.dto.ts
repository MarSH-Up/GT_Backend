import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export interface UpdateUser {
  email?: string;
  name?: string;
  password?: string;
  age?: number;
  gender?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
}
