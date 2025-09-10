import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IUserRepository from '@/modules/users/adapters/i_user.repository';
import IUpdateUserUseCase, {
  UpdateUserParam,
  UpdateUserResponse,
} from '@/modules/users/domain/usecase/i_update_user_use_case';
import { UserRepositoryNotFoundException } from '@/modules/users/exceptions/user_repository.exception';

export default class UpdateUserService implements IUpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    param: UpdateUserParam,
  ): AsyncResult<AppException, UpdateUserResponse> {
    try {
      // Buscar o usuário existente
      const userResult = await this.userRepository.findOne({
        userId: param.userId,
      });

      if (userResult.isLeft()) {
        if (userResult.value instanceof UserRepositoryNotFoundException) {
          return left(new AppException('User not found', 404));
        }
        return left(userResult.value);
      }

      const user = userResult.value;

      // Atualizar apenas os campos fornecidos
      if (param.name !== undefined) {
        user.updateName(param.name);
      }

      if (param.email !== undefined) {
        user.updateEmail(param.email);
      }

      // Marcar como atualizado
      user.toTouch();

      // Salvar as alterações
      const updatedUserResult = await this.userRepository.save(user);

      if (updatedUserResult.isLeft()) {
        return left(updatedUserResult.value);
      }

      return right(new UpdateUserResponse(updatedUserResult.value));
    } catch (error) {
      if (error instanceof AppException) {
        return left(error);
      }
      return left(new AppException(ErrorMessages.UNEXPECTED_ERROR, 500, error));
    }
  }
}
