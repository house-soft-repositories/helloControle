import UserRole from '@/core/types/user_role';
import UserModel from '@/modules/users/infra/models/user.model';

export interface UserQueryOptions {
  selectFields?: (keyof UserModel)[];
  relations?: string[];
  userId?: number;
  userEmail?: string;
  cityId?: number;
  excludeRoles?: UserRole[];
}
