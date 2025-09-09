import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import { ICityCompanyRepository } from '@/modules/city/adapters';
import IFindCompaniesByCityIdUseCase, {
  FindCompaniesByCityIdParam,
  FindCompaniesByCityIdResponse,
} from '@/modules/city/domain/usecase/i_find_companies_by_city_id_use_case';

export default class FindCompaniesByCityIdService
  implements IFindCompaniesByCityIdUseCase
{
  constructor(private cityCompanyRepository: ICityCompanyRepository) {}
  async execute(
    param: FindCompaniesByCityIdParam,
  ): AsyncResult<AppException, FindCompaniesByCityIdResponse> {
    const result = await this.cityCompanyRepository.findByCityId(param.cityId);
    if (result.isLeft()) {
      return left(result.value);
    }
    return right(new FindCompaniesByCityIdResponse(result.value));
  }
}
