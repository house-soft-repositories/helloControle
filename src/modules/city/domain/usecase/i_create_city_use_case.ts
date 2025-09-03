import UseCase from '@/core/interface/use_case';
import CityEntity from '@/modules/city/domain/entities/city.entity';

export default interface ICreateCityUseCase
  extends UseCase<CreateCityParam, CreateCityResponse> {}

export class CreateCityParam {
  constructor(
    public readonly name: string,
    public readonly state: string,
  ) {}
}

export class CreateCityResponse {
  constructor(public readonly cityEntity: CityEntity) {}

  fromResponse() {
    return {
      ...this.cityEntity.toObject(),
    };
  }
}
