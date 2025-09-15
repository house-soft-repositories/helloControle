import { IUnitOfWork } from '@/core/adapters/i_unit_of_work';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import ContractRepository from '@/modules/contract/infra/repositories/contract.repository';
import ProposalRepository from '@/modules/contract/infra/repositories/proposal.repository';
import { DataSource, QueryRunner } from 'typeorm';

export default class TypeormUnitOfWorkService implements IUnitOfWork {
  private queryRunner: QueryRunner;
  constructor(private dataSource: DataSource) {}
  getProposalRepository(): IProposalRepository {
    if (!this.queryRunner || !this.queryRunner.manager) {
      throw new Error(
        'Transaction not started. Call start() first when getProcessLogRepository',
      );
    }
    return new ProposalRepository(this.queryRunner.manager);
  }
  getContractRepository(): IContractRepository {
    if (!this.queryRunner || !this.queryRunner.manager) {
      throw new Error(
        'Transaction not started. Call start() first when getProcessLogRepository',
      );
    }
    return new ContractRepository(this.queryRunner.manager);
  }
  async start() {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit() {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
  }

  async rollback() {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
  }
}
