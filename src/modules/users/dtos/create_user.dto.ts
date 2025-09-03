import UserRole from '@/core/types/user_role';
import UserDto from '@/modules/users/dtos/user.dto';
import { PickType } from '@nestjs/swagger';
import { Equals } from 'class-validator';

export default class CreateUserDto extends PickType(UserDto, [
  'email',
  'name',
  'password',
  'role',
]) {
  @Equals(UserRole.USER)
  declare role: UserRole;
}
