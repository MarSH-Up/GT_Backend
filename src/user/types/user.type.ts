import { UserAccessLevel } from '@prisma/client';

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  therapy: string;
  age: number | null;
  institution: string;
  createdBy: string;
  createdAt: Date;
  deletedAt: Date | null;
  userAccessLevel: UserAccessLevel;
};
