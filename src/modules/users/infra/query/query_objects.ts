import UserModel from '@/modules/users/infra/models/user.model';

export interface UserQueryOptions {
  selectFields?: (keyof UserModel)[];
  relations?: string[];
  userId?: number;
  userEmail?: string;
}
