import { IUnitOfWork } from '@/core/adapters/i_unit_of_work';
import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import ServiceException from '@/core/exceptions/service.exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IApproveProposalUseCase, {
  ApproveProposalParam,
  ApproveProposalResponse,
} from '@/modules/contract/domain/usecase/i_approve_proposal_use_case';

export default class ApproveProposalService implements IApproveProposalUseCase {
  constructor(private readonly unitOfWork: IUnitOfWork) {}
  async execute(
    param: ApproveProposalParam,
  ): AsyncResult<AppException, ApproveProposalResponse> {
    try {
      this.unitOfWork.start();
      const proposalRepository = this.unitOfWork.getProposalRepository();

      const proposalResult = await proposalRepository.findOne({
        proposalId: param.proposalUuid,
      });

      if (proposalResult.isLeft()) {
        this.unitOfWork.rollback();
        return left(proposalResult.value);
      }

      const proposal = proposalResult.value;

      const contractRepository = this.unitOfWork.getContractRepository();

      const contractResult = await contractRepository.findOne({
        contractUuid: proposal.contractUuid,
      });

      if (contractResult.isLeft()) {
        this.unitOfWork.rollback();
        return left(contractResult.value);
      }

      const contract = contractResult.value;

      proposal.approveProposal(param.userApproverId);

      proposal.items.map(item => {
        contract.increaseUsedAmountInItem(
          item.itemId,
          item.amountToIncrease ?? undefined,
          item.quantityToIncrease ?? undefined,
        );
      });

      const proposalSaveResult = await proposalRepository.save(proposal);
      if (proposalSaveResult.isLeft()) {
        this.unitOfWork.rollback();
        return left(proposalSaveResult.value);
      }

      const contractSaveResult = await contractRepository.save(contract);
      if (contractSaveResult.isLeft()) {
        this.unitOfWork.rollback();
        return left(contractSaveResult.value);
      }

      this.unitOfWork.commit();
      return right(
        new ApproveProposalResponse(
          proposalSaveResult.value,
          contractSaveResult.value,
        ),
      );
    } catch (error) {
      this.unitOfWork.rollback();
      if (error instanceof AppException) {
        return left(error);
      }
      return left(
        new ServiceException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
