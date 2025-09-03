import AsyncResult from '@/core/types/async_result';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';

export default class FindContractByIdService {
  constructor(private readonly contractRepository: IContractRepository) {}

  async execute(
    id: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity | null> {
    return this.contractRepository.findById(id);
  }
}
