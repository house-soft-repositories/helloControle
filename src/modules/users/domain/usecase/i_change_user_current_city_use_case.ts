import UseCase from '@/core/interface/use_case';
import UserEntity from '@/modules/users/domain/entities/user.entity';

export default interface IChangeUserCurrentCityUseCase
  extends UseCase<ChangeUserCurrentCityParam, ChangeUserCurrentCityResponse> {}

export class ChangeUserCurrentCityParam {
  constructor(
    public readonly userId: number,
    public readonly cityId: number,
  ) {}
}

export class ChangeUserCurrentCityResponse {
  constructor(public readonly user: UserEntity) {}

  fromResponse() {
    return this.user.toObject();
  }
}
