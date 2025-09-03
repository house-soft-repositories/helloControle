import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import CityModel from '@/modules/city/infra/models/city.model';

export default interface ICityRepository {
  create(cityEntity: CityEntity): CityModel;
  save(cityEntity: CityEntity): AsyncResult<AppException, CityEntity>;
  findAll(): AsyncResult<AppException, CityEntity[]>;
}
