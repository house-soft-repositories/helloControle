import UserEntity from '@/modules/users/domain/entities/user.entity';
import UserModel from '@/modules/users/infra/models/user.model';

export default abstract class UserMapper {
  static toEntity(userModel: UserModel): UserEntity {
    return UserEntity.fromData({
      id: userModel.id,
      password: userModel.password,
      role: userModel.role,
      currentCityId: userModel.currentCityId,
      email: userModel.email,
      name: userModel.name,
    });
  }

  static toModel(userEntity: UserEntity) {
    return {
      ...userEntity.toObject(),
    };
  }
}
