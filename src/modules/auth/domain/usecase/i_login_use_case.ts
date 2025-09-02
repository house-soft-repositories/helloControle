import UseCase from '@/core/interface/use_case';
import AuthTokenEntity from '@/modules/auth/domain/entities/auth_token.entity';

export default interface ILoginUseCase
  extends UseCase<LoginParam, LoginResponse> {}

export class LoginParam {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class LoginResponse {
  constructor(public readonly authTokenEntity: AuthTokenEntity) {}

  fromResponse() {
    return {
      ...this.authTokenEntity.toObject(),
    };
  }
}
