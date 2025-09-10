import CoreModule from '@/core/core_module';
import AuthModule from '@/modules/auth/auth.module';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import CreateContractService from '@/modules/contract/application/create_contract.service';
import FindAllContractsService from '@/modules/contract/application/find_all_contracts.service';
import FindContractByIdService from '@/modules/contract/application/find_contract_by_id.service';
import ContractController from '@/modules/contract/controllers/contract.controller';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import ItemModel from '@/modules/contract/infra/models/item.model';
import ContractRepository from '@/modules/contract/infra/repositories/contract.repository';
import {
  CONTRACT_REPOSITORY,
  CREATE_CONTRACT_SERVICE,
  FIND_ALL_CONTRACTS_SERVICE,
  FIND_CONTRACT_BY_ID_SERVICE,
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
    TypeOrmModule.forFeature([ContractModel, ItemModel]),
  ],
  controllers: [ContractController],
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
        new FindContractByIdService(contractRepository),
    },
  ],
  exports: [CONTRACT_REPOSITORY],
})
export default class ContractModule {}
