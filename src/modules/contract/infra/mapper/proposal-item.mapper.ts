import { BaseMapper } from '@/core/models/base.mapper';
import ProposalItemEntity from '@/modules/contract/domain/entities/proposal_item.entity';
import ProposalItemModel from '@/modules/contract/infra/models/proposal-item.model';

export interface ProposalItemData {
  itemId: string;
  amountToIncrease?: number;
  quantityToIncrease?: number;
}

export default abstract class ProposalItemMapper extends BaseMapper<
  ProposalItemEntity,
  ProposalItemModel
> {
  static toEntity(model: ProposalItemModel): ProposalItemEntity {
    return ProposalItemEntity.fromData({
      proposalId: model.proposalId,
      itemId: model.itemId,
      amountToIncrease: model.amountToIncrease,
      quantityToIncrease: model.quantityToIncrease,
    });
  }
  static toModel(entity: ProposalItemEntity): Partial<ProposalItemModel> {
    return {
      itemId: entity.itemId,
      proposalId: entity.proposalId,
      amountToIncrease: entity.amountToIncrease,
      quantityToIncrease: entity.quantityToIncrease,
    };
  }
}
