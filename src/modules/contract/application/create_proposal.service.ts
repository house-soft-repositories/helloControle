import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import ServiceException from '@/core/exceptions/service.exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IContractRepository from '@/modules/contract/adapters/i_contract_repository';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';
import ProposalItemEntity from '@/modules/contract/domain/entities/proposal_item.entity';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ICreateProposalUseCase, {
  CreateProposalParam,
  CreateProposalResponse,
} from '@/modules/contract/domain/usecase/i_create_proposal_use_case';
import { randomUUID } from 'crypto';

export default class CreateProposalService implements ICreateProposalUseCase {
  constructor(
    private readonly proposalRepository: IProposalRepository,
    private readonly contractRepository: IContractRepository,
  ) {}
  async execute(
    param: CreateProposalParam,
  ): AsyncResult<AppException, CreateProposalResponse> {
    try {
      const contractFinder = await this.contractRepository.findOne({
        contractUuid: param.contractUuid,
      });

      if (contractFinder.isLeft()) {
        return left(contractFinder.value);
      }

      const items = contractFinder.value.items;

      for (const item of param.items) {
        const itemInContract = items.find(i => i.id === item.itemId);
        if (!itemInContract) {
          return left(
            new ServiceException(
              `Item with id ${item.itemId} not found in contract`,
              400,
            ),
          );
        }
        contractFinder.value.increaseUsedAmountInItem(
          item.itemId,
          item.amountToIncrease ,
          item.quantityToIncrease,
        );
      }

      const proposalUuid = randomUUID().toString();

      const proposal = ProposalEntity.create({
        id: proposalUuid,
        contractUuid: contractFinder.value.uuid,
        items: param.items.map(item =>
          ProposalItemEntity.create({
            proposalId: proposalUuid,
            itemId: item.itemId,
            amountToIncrease: item.amountToIncrease,
            quantityToIncrease: item.quantityToIncrease,
          }),
        ),
        createdBy: param.userCreatorId,
        status: ProposalStatusEnum.PENDING,
      });

      const savedProposal = await this.proposalRepository.save(proposal);

      if (savedProposal.isLeft()) {
        return left(savedProposal.value);
      }

      return right(new CreateProposalResponse(savedProposal.value));
    } catch (e) {
      if (e instanceof AppException) {
        return left(e);
      }
      return left(new ServiceException(ErrorMessages.UNEXPECTED_ERROR, 500, e));
    }
  }
}
