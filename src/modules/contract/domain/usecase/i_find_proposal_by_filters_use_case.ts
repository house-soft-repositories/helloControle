import UseCase from '@/core/interface/use_case';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import PageEntity from '@/modules/pagination/domain/entities/page.entity';
import PageOptionsEntity from '@/modules/pagination/domain/entities/page_options.entity';

export default interface IFindProposalByFiltersUseCase
  extends UseCase<FindProposalByFiltersParam, FindProposalByFiltersResponse> {}

export interface FindProposalByFiltersParam {
  pageOptions: PageOptionsEntity;
  contractUuid?: string;
  status?: ProposalStatusEnum;
  createdBy?: number;
}

export class FindProposalByFiltersResponse {
  constructor(private readonly pageProposal: PageEntity<ProposalEntity>) {}

  fromResponse() {
    return this.pageProposal.toObject();
  }
}
