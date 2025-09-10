import UserRole from '@/core/types/user_role';
import UserDto from '@/modules/users/dtos/user.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export default class UpdateUserSuperuserDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'password',
]) {
  @IsOptional()
  declare name: string;

  @IsOptional()
  declare email: string;

  @IsOptional()
  declare role: UserRole;

  @IsOptional()
  declare currentCityId: number;
}
