import AppException from '@/core/exceptions/app_exception';
import BaseRepository from '@/core/interface/base_repository';
import AsyncResult from '@/core/types/async_result';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';
import { CityOrganQueryOptions } from '@/modules/city/infra/query/query_objects';

export default interface ICityOrganRepository
  extends BaseRepository<CityOrganModel, CityOrganEntity> {
  findOne(
    query: CityOrganQueryOptions,
  ): AsyncResult<AppException, CityOrganEntity>;
  findAll(): AsyncResult<AppException, CityOrganEntity[]>;
  findByCityId(cityId: number): AsyncResult<AppException, CityOrganEntity[]>;
  findById(id: number): AsyncResult<AppException, CityOrganEntity>;
  update(
    id: number,
    cityOrganEntity: CityOrganEntity,
  ): AsyncResult<AppException, CityOrganEntity>;
}
