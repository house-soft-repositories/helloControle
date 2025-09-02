import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IExtractUserUseCase, {
  ExtractUserParam,
  ExtractUserResponse,
} from '@/modules/auth/domain/usecase/i_extract_user_use_case';
import IUserRepository from '@/modules/users/adapters/i_user.repository';

export default class ExtractUserService implements IExtractUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(
    param: ExtractUserParam,
  ): AsyncResult<AppException, ExtractUserResponse> {
    const userFinder = await this.userRepository.findOne({
      userId: param.userId,
    });
    if (userFinder.isLeft()) {
      return left(userFinder.value);
    }

    return right(new ExtractUserResponse(userFinder.value));
  }
}
