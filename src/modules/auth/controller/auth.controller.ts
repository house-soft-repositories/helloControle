import ICreateUserUseCase, {
  CreateUserParam,
} from '@/modules/users/domain/usecase/i_create_user_use_case';
import CreateUserDto from '@/modules/users/dtos/create_user.dto';
import { CREATE_USER_SERVICE } from '@/modules/users/symbols';
import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';

@Controller('api/auth')
export default class AuthController {
  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly createUserService: ICreateUserUseCase,
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
}
