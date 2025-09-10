import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { Unit } from '@/core/types/unit';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import { ContractQueryOptions } from '@/modules/contract/infra/query/query_objects';

export default interface IContractRepository {
  save(contract: ContractEntity): AsyncResult<AppException, ContractEntity>;
  findOne(
    query: ContractQueryOptions,
  ): AsyncResult<AppException, ContractEntity>;
  findAll(): AsyncResult<AppException, ContractEntity[]>;
  findAllByCityId(cityId: number): AsyncResult<AppException, ContractEntity[]>;
  delete(id: string): AsyncResult<AppException, Unit>;
}
