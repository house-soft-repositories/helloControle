import UseCase from '@/core/interface/use_case';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';

export default interface IApproveProposalUseCase
  extends UseCase<ApproveProposalParam, ApproveProposalResponse> {}

export interface ApproveProposalParam {
  proposalUuid: string;
  userApproverId: number;
}

export class ApproveProposalResponse {
  constructor(
    public readonly proposal: ProposalEntity,
    public readonly contract: ContractEntity,
  ) {}

  fromResponse() {
    return {
      proposal: this.proposal.toObject(),
      contract: this.contract.toObject(),
    };
  }
}
