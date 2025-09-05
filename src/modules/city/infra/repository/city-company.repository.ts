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

  async findById(id: number): AsyncResult<AppException, CityCompanyEntity> {
    try {
      const cityCompany = await this.cityCompanyRepository.findOne({
        where: { id },
      });
      if (!cityCompany) {
        return left(new CityRepositoryException('City company not found', 404));
      }
      return right(CityCompanyMapper.toEntity(cityCompany));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async update(
    id: number,
    cityCompanyEntity: CityCompanyEntity,
  ): AsyncResult<AppException, CityCompanyEntity> {
    try {
      const existingCompany = await this.cityCompanyRepository.findOne({
        where: { id },
      });
      if (!existingCompany) {
        return left(new CityRepositoryException('City company not found', 404));
      }

      // Mapear apenas os campos que não são undefined
      const updatedData = CityCompanyMapper.toModel(cityCompanyEntity);

      // Remover propriedades undefined para evitar problemas no update
      const filteredData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) => value !== undefined),
      );

      // Usar merge e save em vez de update para garantir que as mudanças sejam aplicadas
      const mergedEntity = this.cityCompanyRepository.merge(
        existingCompany,
        filteredData,
      );
      const savedEntity = await this.cityCompanyRepository.save(mergedEntity);

      return right(CityCompanyMapper.toEntity(savedEntity));
    } catch (error) {
      console.error('CityCompanyRepository - Update error:', error);
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
