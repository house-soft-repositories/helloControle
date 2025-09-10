import UseCase from '@/core/interface/use_case';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';

export default interface IGetContractByCityUseCase
  extends UseCase<GetContractByCityParam, GetContractByCityResponse> {}

export interface GetContractByCityParam {
  cityId: number;
}

export class GetContractByCityResponse {
  constructor(public readonly contracts: Array<ContractEntity>) {}

  fromResponse() {
    return this.contracts.map(contract => contract.toObject());
  }
}
