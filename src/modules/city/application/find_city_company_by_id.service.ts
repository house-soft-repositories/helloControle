import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityCompanyRepository from '@/modules/city/adapters/i_city_company_repository';
import IFindCityCompanyByIdUseCase, {
  FindCityCompanyByIdParam,
  FindCityCompanyByIdResponse,
} from '@/modules/city/domain/usecase/i_find_city_company_by_id_use_case';

export default class FindCityCompanyByIdService
  implements IFindCityCompanyByIdUseCase
{
  constructor(private readonly cityCompanyRepository: ICityCompanyRepository) {}

  async execute(
    param: FindCityCompanyByIdParam,
  ): AsyncResult<AppException, FindCityCompanyByIdResponse> {
    const companyResult = await this.cityCompanyRepository.findById(param.id);

    if (companyResult.isLeft()) {
      return left(companyResult.value);
    }

    return right(new FindCityCompanyByIdResponse(companyResult.value));
  }
}
