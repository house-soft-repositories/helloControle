import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import IUserRepository from '@/modules/users/adapters/i_user.repository';
import IChangeUserCurrentCityUseCase, {
  ChangeUserCurrentCityParam,
  ChangeUserCurrentCityResponse,
} from '@/modules/users/domain/usecase/i_change_user_current_city_use_case';

export default class ChangeUserCurrentCityService
  implements IChangeUserCurrentCityUseCase
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cityRepository: ICityRepository,
  ) {}
  async execute(
    param: ChangeUserCurrentCityParam,
  ): AsyncResult<AppException, ChangeUserCurrentCityResponse> {
    try {
      const userFinder = await this.userRepository.findOne({
        userId: param.userId,
      });

      if (userFinder.isLeft()) {
        return left(userFinder.value);
      }

      userFinder.value.changeCurrentCity(param.cityId);

      const cityFinder = await this.cityRepository.findOne({
        cityId: param.cityId,
      });

      if (cityFinder.isLeft()) {
        return left(cityFinder.value);
      }
      const userSaved = await this.userRepository.save(userFinder.value);

      if (userSaved.isLeft()) {
        return left(userSaved.value);
      }
      return right(new ChangeUserCurrentCityResponse(userSaved.value));
    } catch (error) {
      if (error instanceof AppException) {
        return left(error);
      }
      return left(new AppException(ErrorMessages.UNEXPECTED_ERROR, 500, error));
    }
  }
}
