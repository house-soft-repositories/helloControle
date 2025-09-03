import ErrorMessages from '@/core/constants/error_messages';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';
import ContractMapper from '@/modules/contract/infra/mapper/contract.mapper';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class ContractRepository implements IContractRepository {
  constructor(
    @InjectRepository(ContractModel)
    private contractRepository: Repository<ContractModel>,
  ) {}

  async save(
    contract: ContractEntity,
  ): AsyncResult<ContractRepositoryException, ContractEntity> {
    try {
      const contractModel = this.contractRepository.create(
        ContractMapper.toModel(contract),
      );
      const savedContract = await this.contractRepository.save(contractModel);
      return right(ContractMapper.toEntity(savedContract));
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async findAll(): AsyncResult<ContractRepositoryException, ContractEntity[]> {
    try {
      const contracts = await this.contractRepository.find({
        relations: ['cidadeContratante'],
        order: {
          createdAt: 'DESC',
        },
      });
      return right(contracts.map(ContractMapper.toEntity));
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async findBySecretaria(
    secretaria: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]> {
    try {
      if (!secretaria || secretaria.trim() === '') {
        return left(
          new ContractRepositoryException('Secretaria cannot be empty'),
        );
      }

      const contracts = await this.contractRepository.find({
        where: { secretariaContratante: secretaria },
        relations: ['cidadeContratante'],
        order: {
          createdAt: 'DESC',
        },
      });
      return right(contracts.map(ContractMapper.toEntity));
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async findByEmpresa(
    empresa: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity[]> {
    try {
      if (!empresa || empresa.trim() === '') {
        return left(new ContractRepositoryException('Empresa cannot be empty'));
      }

      const contracts = await this.contractRepository.find({
        where: { empresaContratada: empresa },
        relations: ['cidadeContratante'],
        order: {
          createdAt: 'DESC',
        },
      });
      return right(contracts.map(ContractMapper.toEntity));
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async findById(
    id: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity | null> {
    try {
      if (!id || id.trim() === '') {
        return left(
          new ContractRepositoryException('Contract ID cannot be empty'),
        );
      }

      const contract = await this.contractRepository.findOne({
        where: { id },
        relations: ['cidadeContratante'],
      });
      return right(contract ? ContractMapper.toEntity(contract) : null);
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }

  async findByUuid(
    uuid: string,
  ): AsyncResult<ContractRepositoryException, ContractEntity | null> {
    try {
      if (!uuid || uuid.trim() === '') {
        return left(
          new ContractRepositoryException('Contract UUID cannot be empty'),
        );
      }

      const contract = await this.contractRepository.findOne({
        where: { uuid },
        relations: ['cidadeContratante'],
      });
      return right(contract ? ContractMapper.toEntity(contract) : null);
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
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

  async delete(id: string): AsyncResult<ContractRepositoryException, void> {
    try {
      if (!id || id.trim() === '') {
        return left(
          new ContractRepositoryException('Contract ID cannot be empty'),
        );
      }

      const result = await this.contractRepository.delete({ id });

      if (result.affected === 0) {
        return left(
          new ContractRepositoryException('Contract not found for deletion'),
        );
      }

      return right(undefined);
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }
}
