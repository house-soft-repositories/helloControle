import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import CityCompanyModel from '@/modules/city/infra/models/city-company.model';

export default interface ICityCompanyRepository {
  create(cityCompanyEntity: CityCompanyEntity): CityCompanyModel;
  save(
    cityCompanyEntity: CityCompanyEntity,
  ): AsyncResult<AppException, CityCompanyEntity>;
  findByCityId(cityId: number): AsyncResult<AppException, CityCompanyEntity[]>;
  findAll(): AsyncResult<AppException, CityCompanyEntity[]>;
}
