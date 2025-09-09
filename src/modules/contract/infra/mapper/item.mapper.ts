import { BaseMapper } from '@/core/models/base.mapper';
import ItemEntity from '@/modules/contract/domain/entities/item.entity';
import ItemModel from '@/modules/contract/infra/models/item.model';

export default abstract class ItemMapper extends BaseMapper<
  ItemEntity,
  ItemModel
> {
  static toEntity(model: ItemModel): ItemEntity {
    return ItemEntity.fromData({
      id: model.id,
      name: model.name,
      description: model.description,
      unitPrice: model.unitPrice,
      totalPrice: model.totalPrice,
      amountUsed: model.amountUsed,
      quantityUsed: model.quantityUsed,
      quantityTotal: model.quantityTotal,
      type: model.type,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      contractUuid: model.contractUuid,
    });
  }
  static toModel(entity: ItemEntity): Partial<ItemModel> {
    return {
      contractUuid: entity.contractUuid,
      id: entity.id,
      name: entity.name,
      description: entity.description,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      amountUsed: entity.amountUsed,
      quantityUsed: entity.quantityUsed,
      quantityTotal: entity.quantityTotal,
      type: entity.type,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
