import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import ICreateCityUseCase, {
  CreateCityParam,
  CreateCityResponse,
} from '@/modules/city/domain/usecase/i_create_city_use_case';

export default class CreateCityService implements ICreateCityUseCase {
  constructor(private readonly cityRepository: ICityRepository) {}
  async execute(
    param: CreateCityParam,
  ): AsyncResult<AppException, CreateCityResponse> {
    const cityEntity = new CityEntity({
      ...param,
    });
    const savedCityResult = await this.cityRepository.save(cityEntity);

    if (savedCityResult.isLeft()) {
      return left(savedCityResult.value);
    }

    return right(new CreateCityResponse(savedCityResult.value));
  }
}
