import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import UserEntity from '@/modules/users/domain/entities/user.entity';
import { UserQueryOptions } from '@/modules/users/infra/query/query_objects';

export default interface IUserRepository {
  findOne(query: UserQueryOptions): AsyncResult<AppException, UserEntity>;
  findAll(query?: UserQueryOptions): AsyncResult<AppException, UserEntity[]>;
  save(user: UserEntity): AsyncResult<AppException, UserEntity>;
}
