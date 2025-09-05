import { BaseMapper } from '@/core/models/base.mapper';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import CityCompanyModel from '@/modules/city/infra/models/city-company.model';

export default abstract class CityCompanyMapper extends BaseMapper<
  CityCompanyEntity,
  CityCompanyModel
> {
  static toEntity(model: CityCompanyModel): CityCompanyEntity {
    return new CityCompanyEntity({
      id: model.id,
      nome: model.nome,
      nomeFantasia: model.nomeFantasia,
      cnpj: model.cnpj,
      email: model.email,
      contato: model.contato,
      uf: model.uf,
      cidade: model.cidade,
      cityId: model.cityId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toModel(entity: CityCompanyEntity): Partial<CityCompanyModel> {
    return {
      id: entity.id,
      nome: entity.nome,
      nomeFantasia: entity.nomeFantasia,
      cnpj: entity.cnpj,
      email: entity.email,
      contato: entity.contato,
      uf: entity.uf,
      cidade: entity.cidade,
      cityId: entity.cityId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
