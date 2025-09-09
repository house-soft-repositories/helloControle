import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import { ICityOrganRepository } from '@/modules/city/adapters';
import IFindOrgansByCityIdUseCase, {
  FindOrgansByCityIdParam,
  FindOrgansByCityIdResponse,
} from '@/modules/city/domain/usecase/i_find_organs_by_city_id_use_case';

export default class FindOrgansByCityIdService
  implements IFindOrgansByCityIdUseCase
{
  constructor(private cityOrganRepository: ICityOrganRepository) {}

  async execute(
    param: FindOrgansByCityIdParam,
  ): AsyncResult<AppException, FindOrgansByCityIdResponse> {
    const result = await this.cityOrganRepository.findByCityId(param.cityId);
    if (result.isLeft()) {
      return left(result.value);
    }
    return right(new FindOrgansByCityIdResponse(result.value));
  }
}
