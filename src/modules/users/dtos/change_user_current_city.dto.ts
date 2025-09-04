import UserDto from '@/modules/users/dtos/user.dto';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export default class ChangeUserCurrentCityDto extends PickType(UserDto, [
  'currentCityId',
]) {
  @IsNumber()
  @IsNotEmpty()
  declare currentCityId: number;
}
