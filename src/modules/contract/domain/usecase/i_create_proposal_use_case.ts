import UseCase from '@/core/interface/use_case';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';

export default interface ICreateProposalUseCase
  extends UseCase<CreateProposalParam, CreateProposalResponse> {}

export interface CreateProposalParam {
  contractUuid: string;
  items: {
    itemId: string;
    amountToIncrease?: number;
    quantityToIncrease?: number;
  }[];
  userCreatorId: number;
}

export class CreateProposalResponse {
  constructor(public readonly proposal: ProposalEntity) {}

  fromResponse() {
    return this.proposal.toObject();
  }
}
