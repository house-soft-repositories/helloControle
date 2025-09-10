import ErrorMessages from '@/core/constants/error_messages';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import { unit, Unit } from '@/core/types/unit';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';
import ContractMapper from '@/modules/contract/infra/mapper/contract.mapper';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import { ContractQueryOptions } from '@/modules/contract/infra/query/query_objects';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';

export default class ContractRepository implements IContractRepository {
  constructor(
    @InjectRepository(ContractModel)
    private contractRepository: Repository<ContractModel>,
  ) {}
  async findAllByCityId(
    cityId: number,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]> {
    try {
      const contracts = await this.contractRepository.find({
        where: { cityId: cityId },
        order: {
          createdAt: 'DESC',
        },
      });
      return right(contracts.map(ContractMapper.toEntity));
    } catch (e) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, e),
      );
    }
  }
  async findOne(
    query: ContractQueryOptions,
  ): AsyncResult<ContractRepositoryException, ContractEntity> {
    try {
      let options: FindOneOptions<ContractModel> = {
        relations: query.relations,
        select: query.selectFields,
      };
      if (query.contractId) {
        options = {
          ...options,
          where: { id: query.contractId },
        };
      }
      if (query.contractUuid) {
        options = {
          ...options,
          where: { uuid: query.contractUuid },
        };
      }
      const contractFinder =
        await this.contractRepository.findOneOrFail(options);
      return right(ContractMapper.toEntity(contractFinder));
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return left(
          ContractRepositoryException.notFound(
            query.contractId,
            query.contractUuid,
          ),
        );
      }
      return left(
        new ContractRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }

  async save(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity> {
    try {
      const contractData = ContractMapper.toModel(contract);

      const contractModel = this.contractRepository.create(contractData);

      const savedContract = await this.contractRepository.save(contractModel);

      return right(ContractMapper.toEntity(savedContract));
    } catch (error) {
      return left(
        new ContractRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }

  async findAll(): AsyncResult<ContractRepositoryException, ContractEntity[]> {
    try {
      const contracts = await this.contractRepository.find({
        relations: ['cidadeContratante', 'items'],
        order: {
          createdAt: 'DESC',
        },
      });
      return right(contracts.map(ContractMapper.toEntity));
    } catch (error) {
      return left(
        new ContractRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }

  async update(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity> {
    try {
      if (!contract.uuid) {
        return left(
          new ContractRepositoryException(
            'Contract UUID is required for update',
          ),
        );
      }

      const contractData = ContractMapper.toModelForUpdate(contract);

      const result = await this.contractRepository.update(
        { uuid: contract.uuid },
        contractData,
      );

      if (result.affected === 0) {
        return left(
          new ContractRepositoryException('Contract not found for update'),
        );
      }

      const updatedContract = await this.contractRepository.findOne({
        where: { uuid: contract.uuid },
        relations: ['cidadeContratante'],
      });

      if (!updatedContract) {
        return left(
          new ContractRepositoryException('Contract not found after update'),
        );
      }

      return right(ContractMapper.toEntity(updatedContract));
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async delete(id: string): AsyncResult<ContractRepositoryException, Unit> {
    try {
      const result = await this.contractRepository.delete({ id });

      if (result.affected === 0) {
        return left(
          new ContractRepositoryException(
            ErrorMessages.CONTRACT_NOT_DELETED,
            400,
          ),
        );
      }

      return right(unit);
    } catch (error) {
      return left(
        new ContractRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }
}
