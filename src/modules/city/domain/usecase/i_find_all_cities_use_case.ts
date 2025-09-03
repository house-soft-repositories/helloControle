import UseCase from '@/core/interface/use_case';
import CityEntity from '@/modules/city/domain/entities/city.entity';

export default interface IFindAllCitiesUseCase
  extends UseCase<FindAllCitiesParam, FindAllCitiesResponse> {}

export class FindAllCitiesParam {
  constructor() {}
}

export class FindAllCitiesResponse {
  constructor(public readonly cities: CityEntity[]) {}

  fromResponse() {
    return this.cities.map(city => city.toObject());
  }
}
