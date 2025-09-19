import UseCase from '@/core/interface/use_case';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';

export default interface ICreateCityCompanyUseCase
  extends UseCase<CreateCityCompanyParam, CreateCityCompanyResponse> {}

export class CreateCityCompanyParam {
  constructor(
    public readonly nome: string,
    public readonly nomeFantasia: string | undefined,
    public readonly cnpj: string,
    public readonly email: string,
    public readonly contato: string,
    public readonly uf: string,
    public readonly cidade: string,
    public readonly cep: string,
    public readonly logradouro: string,
    public readonly numero: string,
    public readonly bairro: string,
    public readonly cityId: number,
  ) {}
}

export class CreateCityCompanyResponse {
  constructor(public readonly cityCompanyEntity: CityCompanyEntity) {}

  fromResponse() {
    return {
      ...this.cityCompanyEntity.toObject(),
    };
  }
}
