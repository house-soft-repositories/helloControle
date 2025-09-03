import USER_ROLE from '@/core/types/user_role';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: USER_ROLE[]) => SetMetadata('roles', roles);