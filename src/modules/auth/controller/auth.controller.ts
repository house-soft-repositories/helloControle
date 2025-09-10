import { Roles } from '@/core/decorators/role.decorator';
import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import { RolesGuard } from '@/core/guard/role.guard';
import UserRole from '@/core/types/user_role';
import ILoginUseCase, {
  LoginParam,
} from '@/modules/auth/domain/usecase/i_login_use_case';
import IRefreshTokenUseCase, {
  RefreshTokenParam,
} from '@/modules/auth/domain/usecase/i_refresh_token_use_case';
import Credentials from '@/modules/auth/dtos/credentials';
import { LOGIN_SERVICE, REFRESH_TOKEN_SERVICE } from '@/modules/auth/symbols';
import ICreateUserUseCase, {
  CreateUserParam,
} from '@/modules/users/domain/usecase/i_create_user_use_case';
import CreateUserDto from '@/modules/users/dtos/create_user.dto';
import CreateUserAdminDto from '@/modules/users/dtos/create_user_admin.dto';
import UserDto from '@/modules/users/dtos/user.dto';
import { CREATE_USER_SERVICE } from '@/modules/users/symbols';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
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
    @Inject(REFRESH_TOKEN_SERVICE)
    private readonly refreshTokenService: IRefreshTokenUseCase,
  ) {}

  @Post('/register')
  async createRegister(@Body() createUserDto: CreateUserDto) {
    const param = new CreateUserParam(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      createUserDto.role,
    );
    const result = await this.createUserService.execute(param);
    if (result.isLeft()) {
      throw new HttpException(result.value.message, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return result.value.fromResponse();
  }

  @Post('/register/admin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.SUPERUSER, UserRole.ADMIN)
  async createAdmin(@Body() createUserAdminDto: CreateUserAdminDto) {
    const param = new CreateUserParam(
      createUserAdminDto.name,
      createUserAdminDto.email,
      createUserAdminDto.password,
      createUserAdminDto.role,
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

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async refreshToken(@User() user: UserDto) {
    const param = new RefreshTokenParam(user.id);

    const resultRefreshTokenService =
      await this.refreshTokenService.execute(param);

    if (resultRefreshTokenService.isLeft()) {
      throw new HttpException(
        resultRefreshTokenService.value.message,
        resultRefreshTokenService.value.statusCode,
      );
    }
    return resultRefreshTokenService.value.fromResponse();
  }
}
