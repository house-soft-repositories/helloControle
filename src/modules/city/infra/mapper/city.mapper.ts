import { BaseMapper } from '@/core/models/base.mapper';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import CityModel from '@/modules/city/infra/models/city.model';
import CityCompanyMapper from './city-company.mapper';
import CityOrganMapper from './city-organ.mapper';

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
      companies:
        model.companies?.map(company => CityCompanyMapper.toEntity(company)) ||
        [],
      organs: model.organs?.map(organ => CityOrganMapper.toEntity(organ)) || [],
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
