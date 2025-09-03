import AsyncResult from '@/core/types/async_result';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';

export default interface IContractRepository {
  save(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity>;
  findAll(): AsyncResult<ContractRepositoryException, ContractEntity[]>;
  findById(
    id: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity | null>;
  findByUuid(
    uuid: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity | null>;
  findBySecretaria(
    secretaria: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]>;
  findByEmpresa(
    empresa: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]>;
  update(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity>;
  delete(id: string): AsyncResult<ContractRepositoryException, void>;
}
