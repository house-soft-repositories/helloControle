import AsyncResult from '@/core/types/async_result';
import { Unit } from '@/core/types/unit';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';
import { ContractQueryOptions } from '@/modules/contract/infra/query/query_objects';

export default interface IContractRepository {
  save(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity>;
  findOne(
    query: ContractQueryOptions,
  ): AsyncResult<ContractRepositoryException, ContractEntity>;
  findAll(): AsyncResult<ContractRepositoryException, ContractEntity[]>;

  findByOrgao(
    orgao: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]>;
  findByEmpresa(
    empresa: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]>;
  delete(id: string): AsyncResult<ContractRepositoryException, Unit>;
}
