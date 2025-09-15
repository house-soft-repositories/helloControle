import ContractModel from '@/modules/contract/infra/models/contract.model';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';

export interface ContractQueryOptions {
  selectFields?: (keyof ContractModel)[];
  relations?: string[];
  contractId?: string;
  contractUuid?: string;
}

export interface ProposalQueryOptions {
  selectFields?: (keyof ProposalModel)[];
  relations?: string[];
  proposalId?: string;
  contractUuid?: string;
}
