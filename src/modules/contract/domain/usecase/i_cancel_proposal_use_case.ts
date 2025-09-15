import UseCase from '@/core/interface/use_case';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';

export default interface ICancelProposalUseCase
  extends UseCase<CancelProposalParam, CancelProposalResponse> {}

export interface CancelProposalParam {
  proposalId: string;
  cancelReason: string;
  userCancelingId: number;
}

export class CancelProposalResponse {
  constructor(public readonly proposal: ProposalEntity) {}

  fromResponse() {
    return this.proposal.toObject();
  }
}
