import ContractModel from '@/modules/contract/infra/models/contract.model';

export interface ContractQueryOptions {
  selectFields?: (keyof ContractModel)[];
  relations?: string[];
  contractId?: string;
  contractUuid?: string;
}
