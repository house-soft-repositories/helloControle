import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import IFindActiveCitiesUseCase, {
  FindActiveCitiesParam,
  FindActiveCitiesResponse,
} from '@/modules/city/domain/usecase/i_find_active_cities_use_case';

export default class FindActiveCitiesService
  implements IFindActiveCitiesUseCase
{
  constructor(private readonly cityRepository: ICityRepository) {}

  async execute(
    param: FindActiveCitiesParam,
  ): AsyncResult<AppException, FindActiveCitiesResponse> {
    const citiesResult = await this.cityRepository.findAll();

    if (citiesResult.isLeft()) {
      return left(citiesResult.value);
    }

    return right(new FindActiveCitiesResponse(citiesResult.value));
  }
}
