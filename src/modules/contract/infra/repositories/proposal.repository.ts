import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import IProposalRepository from '@/modules/contract/adapters/i_proposal_repository';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ProposalRepositoryException from '@/modules/contract/exceptions/proposal_repository.exception';
import ProposalMapper from '@/modules/contract/infra/mapper/proposal.mapper';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';
import { ProposalQueryOptions } from '@/modules/contract/infra/query/query_objects';
import PageEntity from '@/modules/pagination/domain/entities/page.entity';
import PageMetaEntity from '@/modules/pagination/domain/entities/page_meta.entity';
import PageOptionsEntity from '@/modules/pagination/domain/entities/page_options.entity';
import {
  EntityManager,
  EntityNotFoundError,
  FindOneOptions,
  Repository,
} from 'typeorm';

export default class ProposalRepository implements IProposalRepository {
  private proposalRepository: Repository<ProposalModel>;
  constructor(repoOrManager: Repository<ProposalModel> | EntityManager) {
    if (repoOrManager instanceof Repository) {
      this.proposalRepository = repoOrManager;
    } else {
      this.proposalRepository = repoOrManager.getRepository(ProposalModel);
    }
  }
  async findByFilters(
    pageOptions: PageOptionsEntity,
    status?: ProposalStatusEnum,
    contractUuid?: string,
    createdBy?: number,
  ): AsyncResult<AppException, PageEntity<ProposalEntity>> {
    try {
      let queryBuilder = this.proposalRepository.createQueryBuilder('proposal');
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'proposal.proposalItems',
        'proposalItems',
      );
      if (status) {
        queryBuilder.andWhere('proposal.status = :status', { status });
      }
      if (contractUuid) {
        queryBuilder.andWhere('proposal.contractUuid = :contractUuid', {
          contractUuid,
        });
      }
      if (createdBy) {
        queryBuilder.andWhere('proposal.createdBy = :createdBy', { createdBy });
      }
      queryBuilder = queryBuilder
        .orderBy('proposal.createdAt', pageOptions.order)
        .skip(pageOptions.skip)
        .take(pageOptions.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const pageMeta = new PageMetaEntity({
        pageOptions,
        itemCount,
      });

      return right(
        new PageEntity(entities.map(ProposalMapper.toEntity), pageMeta),
      );
    } catch (error) {
      return left(
        new ProposalRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }
  async findOne(
    query: ProposalQueryOptions,
  ): AsyncResult<AppException, ProposalEntity> {
    try {
      const options: FindOneOptions<ProposalModel> = {
        relations: query.relations,
        select: query.selectFields,
      };
      if (query.proposalId) {
        options.where = { id: query.proposalId };
      }
      if (query.contractUuid) {
        options.where = { contractUuid: query.contractUuid };
      }
      return right(
        ProposalMapper.toEntity(
          await this.proposalRepository.findOneOrFail(options),
        ),
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return left(
          new ProposalRepositoryException(
            ErrorMessages.PROPOSAL_NOT_FOUND,
            404,
            error,
          ),
        );
      }
      return left(
        new ProposalRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }

  create(entity: ProposalEntity): ProposalModel {
    const proposalData = ProposalMapper.toModel(entity);
    return this.proposalRepository.create(proposalData);
  }
  async save(
    entity: ProposalEntity,
  ): AsyncResult<AppException, ProposalEntity> {
    try {
      const proposalModel = this.create(entity);
      await this.proposalRepository.save(proposalModel);
      return right(ProposalMapper.toEntity(proposalModel));
    } catch (error) {
      return left(
        new ProposalRepositoryException(
          ErrorMessages.UNEXPECTED_ERROR,
          500,
          error,
        ),
      );
    }
  }
}
