import { BaseMapper } from '@/core/models/base.mapper';
import ProposalEntity from '@/modules/contract/domain/entities/proposal.entity';
import ProposalItemMapper from '@/modules/contract/infra/mapper/proposal-item.mapper';
import ProposalItemModel from '@/modules/contract/infra/models/proposal-item.model';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';

export default abstract class ProposalMapper extends BaseMapper<
  ProposalEntity,
  ProposalModel
> {
  static toEntity(model: ProposalModel): ProposalEntity {
    return ProposalEntity.fromData({
      id: model.id,
      contractUuid: model.contractUuid,
      status: model.status,
      approvedBy: model.approvedBy,
      approvedAt: model.approvedAt,
      canceledBy: model.canceledBy,
      cancelReason: model.cancelReason,
      canceledAt: model.canceledAt,
      createdBy: model.createdBy,
      createdAt: model.createdAt,
      items: model.proposalItems.map(ProposalItemMapper.toEntity),
      updatedAt: model.updatedAt,
    });
  }
  static toModel(entity: ProposalEntity): Partial<ProposalModel> {
    return {
      id: entity.id,
      contractUuid: entity.contractUuid,
      status: entity.status,
      approvedBy: entity.approvedBy,
      approvedAt: entity.approvedAt,
      canceledBy: entity.canceledBy,
      cancelReason: entity.cancelReason,
      canceledAt: entity.canceledAt,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      proposalItems: entity.items.map(
        ProposalItemMapper.toModel,
      ) as ProposalItemModel[],
      updatedAt: entity.updatedAt,
    };
  }
}
