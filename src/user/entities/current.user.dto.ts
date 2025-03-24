import { UserAccessLevel } from '@prisma/client';
import { AuthType } from 'src/auth/entities/auth.entity';

export class ICurrentUser {
  email: string;

  access: UserAccessLevel;

  authType?: AuthType;
}
