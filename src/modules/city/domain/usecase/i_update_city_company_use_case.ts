import UseCase from '@/core/interface/use_case';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';

export default interface IUpdateCityCompanyUseCase
  extends UseCase<UpdateCityCompanyParam, UpdateCityCompanyResponse> {}

export class UpdateCityCompanyParam {
  constructor(
    public readonly id: number,
    public readonly nome?: string,
    public readonly nomeFantasia?: string,
    public readonly cnpj?: string,
    public readonly email?: string,
    public readonly contato?: string,
    public readonly uf?: string,
    public readonly cidade?: string,
    public readonly cep?: string,
    public readonly logradouro?: string,
    public readonly numero?: string,
    public readonly bairro?: string,
    public readonly cityId?: number,
  ) {}
}

export class UpdateCityCompanyResponse {
  constructor(public readonly company: CityCompanyEntity) {}

  fromResponse() {
    return this.company.toObject();
  }
}
