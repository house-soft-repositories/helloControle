import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityCompanyRepository from '@/modules/city/adapters/i_city_company_repository';
import IFindAllCityCompaniesUseCase, {
  FindAllCityCompaniesParam,
  FindAllCityCompaniesResponse,
} from '@/modules/city/domain/usecase/i_find_all_city_companies_use_case';

export default class FindAllCityCompaniesService
  implements IFindAllCityCompaniesUseCase
{
  constructor(private readonly cityCompanyRepository: ICityCompanyRepository) {}

  async execute(
    param: FindAllCityCompaniesParam,
  ): AsyncResult<AppException, FindAllCityCompaniesResponse> {
    const companiesResult = await this.cityCompanyRepository.findAll();

    if (companiesResult.isLeft()) {
      return left(companiesResult.value);
    }

    return right(new FindAllCityCompaniesResponse(companiesResult.value));
  }
}
