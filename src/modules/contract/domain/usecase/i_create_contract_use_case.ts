import AsyncResult from '@/core/types/async_result';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractRepositoryException from '@/modules/contract/exceptions/contract_repository_exception';

export default interface ICreateContractUseCase {
  execute(contractData: {
    id: string;
    nome?: string;
    descricao?: string;
    valorTotal: number;
    valorGlosado: number;
    dataAssinatura: Date;
    dataVencimento: Date;
    orgaoContratante: string;
    empresaContratada: string;
    cidadeContratante?: string;
  }): AsyncResult<ContractRepositoryException, ContractEntity>;
}
