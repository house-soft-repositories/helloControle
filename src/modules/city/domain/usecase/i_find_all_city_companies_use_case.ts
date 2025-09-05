import UseCase from '@/core/interface/use_case';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';

export default interface IFindAllCityCompaniesUseCase
  extends UseCase<FindAllCityCompaniesParam, FindAllCityCompaniesResponse> {}

export class FindAllCityCompaniesParam {
  constructor() {}
}

export class FindAllCityCompaniesResponse {
  constructor(public readonly companies: CityCompanyEntity[]) {}

  fromResponse() {
    return this.companies.map(company => company.toObject());
  }
}
