import UserDto from '@/modules/users/dtos/user.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export default class UpdateUserDto extends OmitType(UserDto, [
  'id',
  'currentCityId',
  'createdAt',
  'updatedAt',
  'password',
  'role',
]) {
  @IsOptional()
  declare name: string;

  @IsOptional()
  declare email: string;
}
