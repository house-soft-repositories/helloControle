import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import IFindAllCitiesUseCase, {
  FindAllCitiesParam,
  FindAllCitiesResponse,
} from '@/modules/city/domain/usecase/i_find_all_cities_use_case';

export default class FindAllCitiesService implements IFindAllCitiesUseCase {
  constructor(private readonly cityRepository: ICityRepository) {}

  async execute(
    param: FindAllCitiesParam,
  ): AsyncResult<AppException, FindAllCitiesResponse> {
    const citiesResult = await this.cityRepository.findAll();

    if (citiesResult.isLeft()) {
      return left(citiesResult.value);
    }

    return right(new FindAllCitiesResponse(citiesResult.value));
  }
}
