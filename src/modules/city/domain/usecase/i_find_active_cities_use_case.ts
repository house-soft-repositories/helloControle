import UseCase from '@/core/interface/use_case';
import CityEntity from '@/modules/city/domain/entities/city.entity';

export default interface IFindActiveCitiesUseCase
  extends UseCase<FindActiveCitiesParam, FindActiveCitiesResponse> {}

export class FindActiveCitiesParam {
  constructor() {}
}

export class FindActiveCitiesResponse {
  constructor(public readonly cities: CityEntity[]) {}

  fromResponse() {
    return this.cities
      .filter(city => city.isActive)
      .map(city => ({
        id: city.id,
        name: city.name,
        state: city.state,
        isActive: city.isActive,
      }));
  }
}
