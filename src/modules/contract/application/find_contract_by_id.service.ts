import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IFindContractByIdService, {
  FindContractByIdParam,
  FindContractByIdResponse,
} from '@/modules/contract/domain/usecase/i_find_contract_by_uuid_use_case';

export default class FindContractByIdService
  implements IFindContractByIdService
{
  constructor(private readonly contractRepository: IContractRepository) {}
  async execute(
    param: FindContractByIdParam,
  ): AsyncResult<AppException, FindContractByIdResponse> {
    const contractResult = await this.contractRepository.findOne({
      contractUuid: param.uuid,
      relations: ['items'],
    });
    if (contractResult.isLeft()) {
      return left(contractResult.value);
    }
    return right(new FindContractByIdResponse(contractResult.value));
  }
}
