import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';

export interface IUnitOfWork {
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getProposalRepository(): IProposalRepository;
  getContractRepository(): IContractRepository;
}
