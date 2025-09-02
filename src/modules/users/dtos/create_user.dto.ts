import UserDto from '@/modules/users/dtos/user.dto';
import { OmitType } from '@nestjs/swagger';

export default class CreateUserDto extends OmitType(UserDto, ['id']) {}
