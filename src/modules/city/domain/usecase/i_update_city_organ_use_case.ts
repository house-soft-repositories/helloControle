import UseCase from '@/core/interface/use_case';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';

export default interface IUpdateCityOrganUseCase
  extends UseCase<UpdateCityOrganParam, UpdateCityOrganResponse> {}

export class UpdateCityOrganParam {
  constructor(
    public readonly id: number,
    public readonly nome?: string,
    public readonly cityId?: number,
  ) {}
}

export class UpdateCityOrganResponse {
  constructor(public readonly organ: CityOrganEntity) {}

  fromResponse() {
    return this.organ.toObject();
  }
}
