import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import ServiceException from '@/core/exceptions/service.exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ItemEntity from '@/modules/contract/domain/entities/item.entity';
import ICreateContractUseCase, {
  CreateContractParam,
  CreateContractResponse,
} from '@/modules/contract/domain/usecase/i_create_contract_use_case';

export default class CreateContractService implements ICreateContractUseCase {
  constructor(private readonly contractRepository: IContractRepository) {}
  async execute(
    param: CreateContractParam,
  ): AsyncResult<AppException, CreateContractResponse> {
    try {
      const existingContract = await this.contractRepository.findOne({
        contractId: param.id,
      });

      if (
        (existingContract.isLeft() &&
          existingContract.value.statusCode !== 404) ||
        existingContract.isRight()
      ) {
        return left(
          new ServiceException(ErrorMessages.CONTRACT_ALREADY_EXISTS, 409),
        );
      }

      const contractEntity = ContractEntity.create({
        id: param.id,
        nome: param.nome,
        descricao: param.descricao,
        valorTotal: param.valorTotal,
        valorGlosado: param.valorGlosado,
        dataAssinatura: param.dataAssinatura,
        dataVencimento: param.dataVencimento,
        orgaoContratante: param.orgaoContratante,
        empresaContratada: param.empresaContratada,
        cidadeContratante: param.cidadeContratante,
      });

      if (param.items.length > 0) {
        param.items.map(item => {
          contractEntity.addItem(
            ItemEntity.create({
              name: item.name,
              description: item.description,
              unitPrice: item.unitPrice,
              totalPrice: item.totalPrice,
              amountUsed: item.amountUsed,
              quantityUsed: item.quantityUsed,
              quantityTotal: item.quantityTotal,
              type: item.type,
              contractUuid: contractEntity.uuid,
            }),
          );
        });
      }

      const savedContract = await this.contractRepository.save(contractEntity);

      if (savedContract.isLeft()) {
        return left(savedContract.value);
      }

      return right(new CreateContractResponse(savedContract.value));
    } catch (error) {
      if (error instanceof AppException) {
        return left(error);
      }
      return left(
        new ServiceException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
