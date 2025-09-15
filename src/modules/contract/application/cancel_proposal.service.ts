import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import ServiceException from '@/core/exceptions/service.exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import ICancelProposalUseCase, {
  CancelProposalParam,
  CancelProposalResponse,
} from '@/modules/contract/domain/usecase/i_cancel_proposal_use_case';

export default class CancelProposalService implements ICancelProposalUseCase {
  constructor(private readonly proposalRepository: IProposalRepository) {}
  async execute(
    param: CancelProposalParam,
  ): AsyncResult<AppException, CancelProposalResponse> {
    try {
      const proposalResult = await this.proposalRepository.findOne({
        proposalId: param.proposalId,
      });

      if (proposalResult.isLeft()) {
        return left(proposalResult.value);
      }
      proposalResult.value.cancelProposal(
        param.userCancelingId,
        param.cancelReason,
      );

      const saveResult = await this.proposalRepository.save(
        proposalResult.value,
      );
      if (saveResult.isLeft()) {
        return left(saveResult.value);
      }
      return right(new CancelProposalResponse(saveResult.value));
    } catch (error) {
      if (error instanceof AppException) {
        return left(error);
      }
      return left(
        new ServiceException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error as Error,
        ),
      );
    }
  }
}
