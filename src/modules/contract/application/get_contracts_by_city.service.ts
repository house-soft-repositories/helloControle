import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IGetContractByCityUseCase, {
  GetContractByCityParam,
  GetContractByCityResponse,
} from '@/modules/contract/domain/usecase/i_get_contracts_by_city_use_case';

export default class GetContractsByCityService
  implements IGetContractByCityUseCase
{
  constructor(private readonly contractRepository: IContractRepository) {}
  async execute(
    param: GetContractByCityParam,
  ): AsyncResult<AppException, GetContractByCityResponse> {
    const contractsResult = await this.contractRepository.findAllByCityId(
      param.cityId,
    );
    if (contractsResult.isLeft()) {
      return left(contractsResult.value);
    }

    return right(new GetContractByCityResponse(contractsResult.value));
  }
}
