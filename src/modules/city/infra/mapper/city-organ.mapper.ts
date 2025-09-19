import { BaseMapper } from '@/core/models/base.mapper';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';

export default abstract class CityOrganMapper extends BaseMapper<
  CityOrganEntity,
  CityOrganModel
> {
  static toEntity(model: CityOrganModel): CityOrganEntity {
    return new CityOrganEntity({
      id: model.id,
      nome: model.nome,
      cep: model.cep,
      logradouro: model.logradouro,
      numero: model.numero,
      bairro: model.bairro,
      cityId: model.cityId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: CityOrganEntity): Partial<CityOrganModel> {
    return {
      id: entity.id,
      nome: entity.nome,
      cep: entity.cep,
      logradouro: entity.logradouro,
      numero: entity.numero,
      bairro: entity.bairro,
      cityId: entity.cityId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
