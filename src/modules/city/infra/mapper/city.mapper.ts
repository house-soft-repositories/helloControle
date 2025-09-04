import { BaseMapper } from '@/core/models/base.mapper';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import CityModel from '@/modules/city/infra/models/city.model';

export default abstract class CityMapper extends BaseMapper<
  CityEntity,
  CityModel
> {
  static toEntity(model: CityModel): CityEntity {
    return new CityEntity({
      id: model.id,
      name: model.name,
      state: model.state,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: CityEntity): Partial<CityModel> {
    return {
      id: entity.id,
      name: entity.name,
      state: entity.state,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
