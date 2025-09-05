import UseCase from '@/core/interface/use_case';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';

export default interface ICreateCityOrganUseCase
  extends UseCase<CreateCityOrganParam, CreateCityOrganResponse> {}

export class CreateCityOrganParam {
  constructor(
    public readonly nome: string,
    public readonly cityId: number,
  ) {}
}

export class CreateCityOrganResponse {
  constructor(public readonly cityOrganEntity: CityOrganEntity) {}

  fromResponse() {
    return {
      ...this.cityOrganEntity.toObject(),
    };
  }
}
