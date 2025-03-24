import { UserAccessLevel } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  therapy: string;
  age: number;
  institution: string;
  createdBy: string;
  userAccessLevel: UserAccessLevel;
}
