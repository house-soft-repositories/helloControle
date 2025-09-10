import UseCase from '@/core/interface/use_case';
import UserEntity from '@/modules/users/domain/entities/user.entity';

export default interface IUpdateUserUseCase
  extends UseCase<UpdateUserParam, UpdateUserResponse> {}

export class UpdateUserParam {
  constructor(
    public readonly userId: number,
    public readonly name?: string,
    public readonly email?: string,
  ) {}
}

export class UpdateUserResponse {
  constructor(public readonly userEntity: UserEntity) {}

  fromResponse() {
    const userObj = this.userEntity.toObject();
    return {
      id: userObj.id,
      name: userObj.name,
      email: userObj.email,
      role: userObj.role,
      currentCityId: userObj.currentCityId,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
    };
  }
}
