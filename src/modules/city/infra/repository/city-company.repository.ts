import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityCompanyRepository from '@/modules/city/adapters/i_city_company_repository';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import CityRepositoryException from '@/modules/city/exceptions/city_repository.exception';
import CityCompanyMapper from '@/modules/city/infra/mapper/city-company.mapper';
import CityCompanyModel from '@/modules/city/infra/models/city-company.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class CityCompanyRepository implements ICityCompanyRepository {
  constructor(
    @InjectRepository(CityCompanyModel)
    private readonly cityCompanyRepository: Repository<CityCompanyModel>,
  ) {}

  create(cityCompanyEntity: CityCompanyEntity): CityCompanyModel {
    const cityCompanyData = CityCompanyMapper.toModel(cityCompanyEntity);
    return this.cityCompanyRepository.create(cityCompanyData);
  }

  async save(
    cityCompanyEntity: CityCompanyEntity,
  ): AsyncResult<AppException, CityCompanyEntity> {
    try {
      const cityCompanyModel = this.create(cityCompanyEntity);
      await this.cityCompanyRepository.save(cityCompanyModel);
      return right(CityCompanyMapper.toEntity(cityCompanyModel));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async findByCityId(
    cityId: number,
  ): AsyncResult<AppException, CityCompanyEntity[]> {
    try {
      const cityCompanies = await this.cityCompanyRepository.find({
        where: { cityId },
      });
      return right(cityCompanies.map(CityCompanyMapper.toEntity));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async findAll(): AsyncResult<AppException, CityCompanyEntity[]> {
    try {
      const cityCompanies = await this.cityCompanyRepository.find();
      return right(cityCompanies.map(CityCompanyMapper.toEntity));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
