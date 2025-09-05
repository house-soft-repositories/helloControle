import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import IFindCityOrganByIdUseCase, {
  FindCityOrganByIdParam,
  FindCityOrganByIdResponse,
} from '@/modules/city/domain/usecase/i_find_city_organ_by_id_use_case';

export default class FindCityOrganByIdService
  implements IFindCityOrganByIdUseCase
{
  constructor(private readonly cityOrganRepository: ICityOrganRepository) {}

  async execute(
    param: FindCityOrganByIdParam,
  ): AsyncResult<AppException, FindCityOrganByIdResponse> {
    const organResult = await this.cityOrganRepository.findById(param.id);

    if (organResult.isLeft()) {
      return left(organResult.value);
    }

    return right(new FindCityOrganByIdResponse(organResult.value));
  }
}
