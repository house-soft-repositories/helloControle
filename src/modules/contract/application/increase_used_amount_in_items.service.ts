import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IIncreaseUsedAmountInItemsUseCase, {
  IncreaseUsedAmountInItemsParam,
  IncreaseUsedAmountInItemsResponse,
} from '@/modules/contract/domain/usecase/i_increase_used_amount_in_items_use_case';

export default class IncreaseUsedAmountInItemsService
  implements IIncreaseUsedAmountInItemsUseCase
{
  constructor(private readonly contractRepository: IContractRepository) {}
  async execute(
    param: IncreaseUsedAmountInItemsParam,
  ): AsyncResult<AppException, IncreaseUsedAmountInItemsResponse> {
    try {
      const contractFinderResult = await this.contractRepository.findOne({
        relations: ['items'],
        contractUuid: param.contractUuid,
      });
      if (contractFinderResult.isLeft()) {
        return left(contractFinderResult.value);
      }
      param.items.forEach(itemToIncrease => {
        contractFinderResult.value.increaseUsedAmountInItem(
          itemToIncrease.itemId,
          itemToIncrease.amountToIncrease,
          itemToIncrease.quantityToIncrease,
        );
      });
      const contractSavedResult = await this.contractRepository.save(
        contractFinderResult.value,
      );
      if (contractSavedResult.isLeft()) {
        return left(contractSavedResult.value);
      }
      return right(
        new IncreaseUsedAmountInItemsResponse(contractSavedResult.value),
      );
    } catch (error) {
      if (error instanceof AppException) {
        return left(error);
      }
      return left(new AppException(ErrorMessages.UNEXPECTED_ERROR, 500, error));
    }
  }
}
