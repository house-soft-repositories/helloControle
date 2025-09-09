import AppException from '@/core/exceptions/app_exception';
import BaseRepository from '@/core/interface/base_repository';
import AsyncResult from '@/core/types/async_result';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import CityCompanyModel from '@/modules/city/infra/models/city-company.model';
import { CityCompanyQueryOptions } from '@/modules/city/infra/query/query_objects';

export default interface ICityCompanyRepository
  extends BaseRepository<CityCompanyModel, CityCompanyEntity> {
  findOne(
    query: CityCompanyQueryOptions,
  ): AsyncResult<AppException, CityCompanyEntity>;
  findAll(): AsyncResult<AppException, CityCompanyEntity[]>;
  findByCityId(cityId: number): AsyncResult<AppException, CityCompanyEntity[]>;
  findById(id: number): AsyncResult<AppException, CityCompanyEntity>;
  update(
    id: number,
    cityCompanyEntity: CityCompanyEntity,
  ): AsyncResult<AppException, CityCompanyEntity>;
}
