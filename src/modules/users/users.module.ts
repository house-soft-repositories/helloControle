import CoreModule from '@/core/core_module';
import {
  EncryptionService,
  IEncryptionService,
} from '@/core/services/encryption.service';
import AuthModule from '@/modules/auth/auth.module';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import CityModule from '@/modules/city/city.module';
import { CITY_REPOSITORY } from '@/modules/city/symbols';
import IUserRepository from '@/modules/users/adapters/i_user.repository';
import ChangeUserCurrentCityService from '@/modules/users/application/change_user_current_city.service';
import CreateUserService from '@/modules/users/application/create_user.service';
import FindAllUsersService from '@/modules/users/application/find_all_users.service';
import UpdateUserService from '@/modules/users/application/update_user.service';
import UserController from '@/modules/users/controller/user.controller';
import UserModel from '@/modules/users/infra/models/user.model';
import UserRepository from '@/modules/users/infra/repositories/user.repository';
import {
  CHANGE_USER_CURRENT_CITY_SERVICE,
  CREATE_USER_SERVICE,
  FIND_ALL_USERS_SERVICE,
  UPDATE_USER_SERVICE,
  USER_REPOSITORY,
} from '@/modules/users/symbols';
import { forwardRef, Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    CoreModule,
    CityModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    {
      inject: [getRepositoryToken(UserModel)],
      provide: USER_REPOSITORY,
      useFactory: (userRepository: Repository<UserModel>) =>
        new UserRepository(userRepository),
    },
    {
      inject: [USER_REPOSITORY, EncryptionService],
      provide: CREATE_USER_SERVICE,
      useFactory: (
        userRepository: IUserRepository,
        encryption: IEncryptionService,
      ) => new CreateUserService(userRepository, encryption),
    },
    {
      inject: [USER_REPOSITORY, CITY_REPOSITORY],
      provide: CHANGE_USER_CURRENT_CITY_SERVICE,
      useFactory: (
        userRepository: IUserRepository,
        cityRepository: ICityRepository,
      ) => new ChangeUserCurrentCityService(userRepository, cityRepository),
    },
    {
      inject: [USER_REPOSITORY],
      provide: FIND_ALL_USERS_SERVICE,
      useFactory: (userRepository: IUserRepository) =>
        new FindAllUsersService(userRepository),
    },
    {
      inject: [USER_REPOSITORY],
      provide: UPDATE_USER_SERVICE,
      useFactory: (userRepository: IUserRepository) =>
        new UpdateUserService(userRepository),
    },
  ],
  exports: [
    {
      inject: [USER_REPOSITORY, EncryptionService],
      provide: CREATE_USER_SERVICE,
      useFactory: (
        userRepository: IUserRepository,
        encryption: IEncryptionService,
      ) => new CreateUserService(userRepository, encryption),
    },
    {
      inject: [getRepositoryToken(UserModel)],
      provide: USER_REPOSITORY,
      useFactory: (userRepository: Repository<UserModel>) =>
        new UserRepository(userRepository),
    },
  ],
})
export default class UsersModule {}
