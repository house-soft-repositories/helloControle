import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
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
    const queryOptions = param.cityId ? { cityId: param.cityId } : undefined;
    const usersResult = await this.userRepository.findAll(queryOptions);

    if (usersResult.isLeft()) {
      return left(usersResult.value);
    }

    return right(new FindAllUsersResponse(usersResult.value));
  }
}
