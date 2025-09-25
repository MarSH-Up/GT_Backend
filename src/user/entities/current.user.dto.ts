import { UserAccessLevel } from '@prisma/client';
import { AuthType } from 'src/auth/entities/auth.entity';

export class ICurrentUser {
  userId: string;
  email: string;
  access: UserAccessLevel;
  authType?: AuthType;
}
