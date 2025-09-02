import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import ILoginUseCase, {
  LoginParam,
} from '@/modules/auth/domain/usecase/i_login_use_case';
import Credentials from '@/modules/auth/dtos/credentials';
import { LOGIN_SERVICE } from '@/modules/auth/symbols';
import ICreateUserUseCase, {
  CreateUserParam,
} from '@/modules/users/domain/usecase/i_create_user_use_case';
import CreateUserDto from '@/modules/users/dtos/create_user.dto';
import UserDto from '@/modules/users/dtos/user.dto';
import { CREATE_USER_SERVICE } from '@/modules/users/symbols';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('api/auth')
export default class AuthController {
  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly createUserService: ICreateUserUseCase,
    @Inject(LOGIN_SERVICE)
    private readonly loginService: ILoginUseCase,
  ) {}

  @Post('/register')
  async createRegister(@Body() createUserDto: CreateUserDto) {
    const param = new CreateUserParam(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
    );
    const result = await this.createUserService.execute(param);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }
  @Post('/login')
  async login(@Body() credentials: Credentials) {
    const param = new LoginParam(credentials.email, credentials.password);
    const result = await this.loginService.execute(param);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@User() user: UserDto) {
    return user;
  }
}
