import ErrorMessages from '@/core/constants/error_messages';
import ServiceException from '@/core/exceptions/service.exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ICreateContractUseCase from '@/modules/contract/domain/usecase/i_create_contract_use_case';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';

export default class CreateContractService implements ICreateContractUseCase {
  constructor(private readonly contractRepository: IContractRepository) {}

  async execute(contractData: {
    id: string;
    nome?: string;
    descricao?: string;
    valorTotal: number;
    valorGlosado: number;
    dataAssinatura: Date;
    dataVencimento: Date;
    secretariaContratante: string;
    empresaContratada: string;
    cidadeContratante?: string;
  }): AsyncResult<ContractRepositoryException, ContractEntity> {
    try {
      // Verificar se já existe um contrato com o mesmo ID
      const existingContract = await this.contractRepository.findById(
        contractData.id,
      );

      if (existingContract.isRight() && existingContract.value !== null) {
        return left(
          new ServiceException(
            ErrorMessages.UNEXPECTED_ERROR,
            409,
          ) as ContractRepositoryException,
        );
      }

      const contractEntity = ContractEntity.create({
        id: contractData.id,
        nome: contractData.nome,
        descricao: contractData.descricao,
        valorTotal: contractData.valorTotal,
        valorGlosado: contractData.valorGlosado,
        dataAssinatura: contractData.dataAssinatura,
        dataVencimento: contractData.dataVencimento,
        secretariaContratante: contractData.secretariaContratante,
        empresaContratada: contractData.empresaContratada,
        cidadeContratante: contractData.cidadeContratante,
      });

      const savedContract = await this.contractRepository.save(contractEntity);

      if (savedContract.isLeft()) {
        return left(savedContract.value);
      }

      return right(savedContract.value);
    } catch (error) {
      return left(
        new ContractRepositoryException(ErrorMessages.UNEXPECTED_ERROR, error),
      );
    }
  }
}
