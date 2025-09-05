import UseCase from '@/core/interface/use_case';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';

export default interface IFindCityCompanyByIdUseCase
  extends UseCase<FindCityCompanyByIdParam, FindCityCompanyByIdResponse> {}

export class FindCityCompanyByIdParam {
  constructor(public readonly id: number) {}
}

export class FindCityCompanyByIdResponse {
  constructor(public readonly company: CityCompanyEntity) {}

  fromResponse() {
    return this.company.toObject();
  }
}
