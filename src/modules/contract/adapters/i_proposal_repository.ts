import AppException from '@/core/exceptions/app_exception';
import BaseRepository from '@/core/interface/base_repository';
import AsyncResult from '@/core/types/async_result';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';
import { ProposalQueryOptions } from '@/modules/contract/infra/query/query_objects';
import PageEntity from '@/modules/pagination/domain/entities/page.entity';
import PageOptionsEntity from '@/modules/pagination/domain/entities/page_options.entity';

export default interface IProposalRepository
  extends BaseRepository<ProposalModel, ProposalEntity> {
  findOne(
    query: ProposalQueryOptions,
  ): AsyncResult<AppException, ProposalEntity>;
  findByFilters(
    pageOptions: PageOptionsEntity,
    status?: ProposalStatusEnum,
    contractUuid?: string,
    createdBy?: number,
  ): AsyncResult<AppException, PageEntity<ProposalEntity>>;
}
