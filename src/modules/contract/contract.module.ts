import { IUnitOfWork } from '@/core/adapters/i_unit_of_work';
import CoreModule from '@/core/core_module';
import { UNIT_OF_WORK } from '@/core/symbols';
import AuthModule from '@/modules/auth/auth.module';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import ApproveProposalService from '@/modules/contract/application/approve_proposal.service';
import CancelProposalService from '@/modules/contract/application/cancel_proposal.service';
import CreateContractService from '@/modules/contract/application/create_contract.service';
import CreateProposalService from '@/modules/contract/application/create_proposal.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import IFindContractByIdService from '@/modules/contract/application/find_contract_by_id.service';
import FindProposalByFiltersService from '@/modules/contract/application/find_proposal_by_filters.service';
import GetContractsByCityService from '@/modules/contract/application/get_contracts_by_city.service';
import IncreaseUsedAmountInItemsService from '@/modules/contract/application/increase_used_amount_in_items.service';
import ContractController from '@/modules/contract/controllers/contract.controller';
import ProposalController from '@/modules/contract/controllers/proposal.controller';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import ItemModel from '@/modules/contract/infra/models/item.model';
import ProposalItemModel from '@/modules/contract/infra/models/proposal-item.model';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';
import ContractRepository from '@/modules/contract/infra/repositories/contract.repository';
import ProposalRepository from '@/modules/contract/infra/repositories/proposal.repository';
import {
  APPROVE_PROPOSAL_SERVICE,
  CANCEL_PROPOSAL_SERVICE,
  CONTRACT_REPOSITORY,
  CREATE_CONTRACT_SERVICE,
  CREATE_PROPOSAL_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
  FIND_CONTRACT_BY_ID_SERVICE,
  FIND_PROPOSAL_BY_FILTERS_SERVICE,
  GET_CONTRACTS_BY_CITY_SERVICE,
  INCREASE_USED_AMOUNT_IN_ITEMS_SERVICE,
  PROPOSAL_REPOSITORY,
} from '@/modules/contract/symbols';
import IFileRepository from '@/modules/file/adapters/i_file_repository';
import FileModule from '@/modules/file/file.module';
import { FILE_REPOSITORY } from '@/modules/file/symbols';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    FileModule,
    TypeOrmModule.forFeature([
      ContractModel,
      ItemModel,
      ProposalModel,
      ProposalItemModel,
    ]),
  ],
  controllers: [ContractController, ProposalController],
  providers: [
    {
      inject: [getRepositoryToken(ContractModel)],
      provide: CONTRACT_REPOSITORY,
      useFactory: (contractRepository: Repository<ContractModel>) =>
        new ContractRepository(contractRepository),
    },
    {
      inject: [CONTRACT_REPOSITORY, FILE_REPOSITORY],
      provide: CREATE_CONTRACT_SERVICE,
      useFactory: (
        contractRepository: IContractRepository,
        fileRepository: IFileRepository,
      ) => new CreateContractService(contractRepository, fileRepository),
    },
    {
      inject: [CONTRACT_REPOSITORY],
      provide: FIND_ALL_CONTRACTS_SERVICE,
      useFactory: (contractRepository: IContractRepository) =>
        new FindAllContractsService(contractRepository),
    },
    {
      inject: [CONTRACT_REPOSITORY],
      provide: FIND_CONTRACT_BY_ID_SERVICE,
      useFactory: (contractRepository: IContractRepository) =>
        new IFindContractByIdService(contractRepository),
    },
    {
      inject: [CONTRACT_REPOSITORY],
      provide: GET_CONTRACTS_BY_CITY_SERVICE,
      useFactory: (contractRepository: IContractRepository) =>
        new GetContractsByCityService(contractRepository),
    },
    {
      inject: [CONTRACT_REPOSITORY],
      provide: INCREASE_USED_AMOUNT_IN_ITEMS_SERVICE,
      useFactory: (contractRepository: IContractRepository) =>
        new IncreaseUsedAmountInItemsService(contractRepository),
    },
    {
      inject: [getRepositoryToken(ProposalModel)],
      provide: PROPOSAL_REPOSITORY,
      useFactory: (proposalRepository: Repository<ProposalModel>) =>
        new ProposalRepository(proposalRepository),
    },
    {
      inject: [PROPOSAL_REPOSITORY, CONTRACT_REPOSITORY],
      provide: CREATE_PROPOSAL_SERVICE,
      useFactory: (
        proposalRepository: IProposalRepository,
        contractRepository: IContractRepository,
      ) => new CreateProposalService(proposalRepository, contractRepository),
    },
    {
      inject: [UNIT_OF_WORK],
      provide: APPROVE_PROPOSAL_SERVICE,
      useFactory: (unitOfWork: IUnitOfWork) =>
        new ApproveProposalService(unitOfWork),
    },
    {
      inject: [PROPOSAL_REPOSITORY],
      provide: FIND_PROPOSAL_BY_FILTERS_SERVICE,
      useFactory: (proposalRepository: IProposalRepository) =>
        new FindProposalByFiltersService(proposalRepository),
    },
    {
      inject: [PROPOSAL_REPOSITORY],
      provide: CANCEL_PROPOSAL_SERVICE,
      useFactory: (proposalRepository: IProposalRepository) =>
        new CancelProposalService(proposalRepository),
    },
  ],
  exports: [CONTRACT_REPOSITORY],
})
export default class ContractModule {}
