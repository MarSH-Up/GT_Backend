import { UserAccessLevel } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  therapistId: string;
  age: number;
  institutionId: string;
  createdBy: string;
  userAccessLevel: UserAccessLevel;
}
