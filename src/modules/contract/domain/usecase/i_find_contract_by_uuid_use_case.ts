import UseCase from '@/core/interface/use_case';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';

export default interface IFindContractByIdService
  extends UseCase<FindContractByIdParam, FindContractByIdResponse> {}

export interface FindContractByIdParam {
  uuid: string;
}

export class FindContractByIdResponse {
  constructor(public readonly contract: ContractEntity) {}

  fromResponse() {
    return this.contract.toObject();
  }
}
