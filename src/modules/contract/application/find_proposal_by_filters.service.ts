import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import IFindProposalByFiltersUseCase, {
  FindProposalByFiltersParam,
  FindProposalByFiltersResponse,
} from '@/modules/contract/domain/usecase/i_find_proposal_by_filters_use_case';

export default class FindProposalByFiltersService
  implements IFindProposalByFiltersUseCase
{
  constructor(private readonly proposalRepository: IProposalRepository) {}
  async execute(
    param: FindProposalByFiltersParam,
  ): AsyncResult<AppException, FindProposalByFiltersResponse> {
    const proposalsResult = await this.proposalRepository.findByFilters(
      param.pageOptions,
      param.status,
      param.contractUuid,
      param.createdBy,
    );
    if (proposalsResult.isLeft()) {
      return left(proposalsResult.value);
    }
    return right(new FindProposalByFiltersResponse(proposalsResult.value));
  }
}
