import UseCase from '@/core/interface/use_case';
import UserEntity from '@/modules/users/domain/entities/user.entity';

export default interface IFindAllUsersUseCase
  extends UseCase<FindAllUsersParam, FindAllUsersResponse> {}

export class FindAllUsersParam {
  constructor(
    public readonly includeInactive?: boolean,
    public readonly cityId?: number,
    public readonly excludeSuperuser?: boolean,
  ) {}
}

export class FindAllUsersResponse {
  constructor(public readonly users: UserEntity[]) {}

  fromResponse() {
    return this.users.map(user => {
      const userObj = user.toObject();
      return {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
        currentCityId: userObj.currentCityId,
        createdAt: userObj.createdAt,
        updatedAt: userObj.updatedAt,
      };
    });
  }
}
