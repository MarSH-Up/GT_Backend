import { User } from 'src/user/types/user.type';

export interface Institution {
  id: string;
  name: string;
  address?: string;
  country?: string;
  createdAt: Date;
  users?: User[];
}
