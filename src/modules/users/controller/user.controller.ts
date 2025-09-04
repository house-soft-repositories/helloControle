import { Roles } from '@/core/decorators/role.decorator';
import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import UserRole from '@/core/types/user_role';
import IChangeUserCurrentCityUseCase, {
  ChangeUserCurrentCityParam,
} from '@/modules/users/domain/usecase/i_change_user_current_city_use_case';
import ChangeUserCurrentCityDto from '@/modules/users/dtos/change_user_current_city.dto';
import UserDto from '@/modules/users/dtos/user.dto';
import { CHANGE_USER_CURRENT_CITY_SERVICE } from '@/modules/users/symbols';
import {
  Body,
  Controller,
  HttpException,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';

@Controller('api/user')
export default class UserController {
  constructor(
    @Inject(CHANGE_USER_CURRENT_CITY_SERVICE)
    private readonly changeUserCurrentCityUseCase: IChangeUserCurrentCityUseCase,
  ) {}

  @Patch('/change/current-city')
  @UseGuards(AuthGuard)
  @Roles(UserRole.USER)
  async changeCurrentCity(
    @User() user: UserDto,
    @Body() body: ChangeUserCurrentCityDto,
  ) {
    const param = new ChangeUserCurrentCityParam(user.id, body.currentCityId);
    const result = await this.changeUserCurrentCityUseCase.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }
}
