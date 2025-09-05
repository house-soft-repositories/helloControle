import UseCase from '@/core/interface/use_case';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';

export default interface IFindAllCityOrgansUseCase
  extends UseCase<FindAllCityOrgansParam, FindAllCityOrgansResponse> {}

export class FindAllCityOrgansParam {
  constructor() {}
}

export class FindAllCityOrgansResponse {
  constructor(public readonly organs: CityOrganEntity[]) {}

  fromResponse() {
    return this.organs.map(organ => organ.toObject());
  }
}
