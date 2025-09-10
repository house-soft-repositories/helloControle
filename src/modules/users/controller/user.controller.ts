import { Roles } from '@/core/decorators/role.decorator';
import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import { RolesGuard } from '@/core/guard/role.guard';
import UserRole from '@/core/types/user_role';
import IChangeUserCurrentCityUseCase, {
  ChangeUserCurrentCityParam,
} from '@/modules/users/domain/usecase/i_change_user_current_city_use_case';
import IFindAllUsersUseCase, {
  FindAllUsersParam,
} from '@/modules/users/domain/usecase/i_find_all_users_use_case';
import IUpdateUserUseCase, {
  UpdateUserParam,
} from '@/modules/users/domain/usecase/i_update_user_use_case';
import ChangeUserCurrentCityDto from '@/modules/users/dtos/change_user_current_city.dto';
import UpdateUserDto from '@/modules/users/dtos/update_user.dto';
import UserDto from '@/modules/users/dtos/user.dto';
import {
  CHANGE_USER_CURRENT_CITY_SERVICE,
  FIND_ALL_USERS_SERVICE,
  UPDATE_USER_SERVICE,
} from '@/modules/users/symbols';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

@Controller('api/user')
export default class UserController {
  constructor(
    @Inject(CHANGE_USER_CURRENT_CITY_SERVICE)
    private readonly changeUserCurrentCityUseCase: IChangeUserCurrentCityUseCase,
    @Inject(FIND_ALL_USERS_SERVICE)
    private readonly findAllUsersUseCase: IFindAllUsersUseCase,
    @Inject(UPDATE_USER_SERVICE)
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {}

  @Get('')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllUsers() {
    const param = new FindAllUsersParam(true);
    const result = await this.findAllUsersUseCase.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

  @Get('/city-users/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findUsersByCity(@Param('id', ParseIntPipe) cityId: number) {
    const param = new FindAllUsersParam(false, cityId);
    const result = await this.findAllUsersUseCase.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

  @Patch('/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const param = new UpdateUserParam(
      userId,
      updateUserDto.name,
      updateUserDto.email,
    );
    const result = await this.updateUserUseCase.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

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
