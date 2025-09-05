import UseCase from '@/core/interface/use_case';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';

export default interface IFindCityOrganByIdUseCase
  extends UseCase<FindCityOrganByIdParam, FindCityOrganByIdResponse> {}

export class FindCityOrganByIdParam {
  constructor(public readonly id: number) {}
}

export class FindCityOrganByIdResponse {
  constructor(public readonly organ: CityOrganEntity) {}

  fromResponse() {
    return this.organ.toObject();
  }
}
