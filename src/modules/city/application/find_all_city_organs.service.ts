import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import IFindAllCityOrgansUseCase, {
  FindAllCityOrgansParam,
  FindAllCityOrgansResponse,
} from '@/modules/city/domain/usecase/i_find_all_city_organs_use_case';

export default class FindAllCityOrgansService
  implements IFindAllCityOrgansUseCase
{
  constructor(private readonly cityOrganRepository: ICityOrganRepository) {}

  async execute(
    param: FindAllCityOrgansParam,
  ): AsyncResult<AppException, FindAllCityOrgansResponse> {
    const organsResult = await this.cityOrganRepository.findAll();

    if (organsResult.isLeft()) {
      return left(organsResult.value);
    }

    return right(new FindAllCityOrgansResponse(organsResult.value));
  }
}
