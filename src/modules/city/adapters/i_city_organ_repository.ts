import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';

export default interface ICityOrganRepository {
  create(cityOrganEntity: CityOrganEntity): CityOrganModel;
  save(
    cityOrganEntity: CityOrganEntity,
  ): AsyncResult<AppException, CityOrganEntity>;
  findByCityId(cityId: number): AsyncResult<AppException, CityOrganEntity[]>;
  findAll(): AsyncResult<AppException, CityOrganEntity[]>;
}
