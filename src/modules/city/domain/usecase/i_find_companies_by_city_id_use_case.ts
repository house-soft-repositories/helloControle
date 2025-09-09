import UseCase from '@/core/interface/use_case';
import { CityCompanyEntity } from '@/modules/city/domain/entities';

export default interface IFindCompaniesByCityIdUseCase
  extends UseCase<FindCompaniesByCityIdParam, FindCompaniesByCityIdResponse> {}

export interface FindCompaniesByCityIdParam {
  cityId: number;
}

export class FindCompaniesByCityIdResponse {
  constructor(public readonly companiesList: CityCompanyEntity[]) {}

  fromResponse() {
    return this.companiesList.map(company => company.toObject());
  }
}
