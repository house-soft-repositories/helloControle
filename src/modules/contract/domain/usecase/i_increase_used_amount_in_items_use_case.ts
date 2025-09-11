import UseCase from '@/core/interface/use_case';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';

export default interface IIncreaseUsedAmountInItemsUseCase
  extends UseCase<
    IncreaseUsedAmountInItemsParam,
    IncreaseUsedAmountInItemsResponse
  > {}

export interface IncreaseUsedAmountInItemsParam {
  contractUuid: string;
  items: {
    itemId: string;
    amountToIncrease?: number;
    quantityToIncrease?: number;
  }[];
}

export class IncreaseUsedAmountInItemsResponse {
  constructor(public readonly contract: ContractEntity) {}

  fromResponse() {
    return this.contract.toObject();
  }
}
