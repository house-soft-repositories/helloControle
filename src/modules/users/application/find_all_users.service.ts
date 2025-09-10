import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import UserRole from '@/core/types/user_role';
import IUserRepository from '@/modules/users/adapters/i_user.repository';
import IFindAllUsersUseCase, {
  FindAllUsersParam,
  FindAllUsersResponse,
} from '@/modules/users/domain/usecase/i_find_all_users_use_case';

export default class FindAllUsersService implements IFindAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    param: FindAllUsersParam,
  ): AsyncResult<AppException, FindAllUsersResponse> {
    const queryOptions: any = {};

    if (param.cityId) {
      queryOptions.cityId = param.cityId;
    }

    if (param.excludeSuperuser) {
      queryOptions.excludeRoles = [UserRole.SUPERUSER];
    }

    const usersResult = await this.userRepository.findAll(queryOptions);

    if (usersResult.isLeft()) {
      return left(usersResult.value);
    }

    return right(new FindAllUsersResponse(usersResult.value));
  }
}
