import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import CityRepositoryException from '@/modules/city/exceptions/city_repository.exception';
import CityOrganMapper from '@/modules/city/infra/mapper/city-organ.mapper';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class CityOrganRepository implements ICityOrganRepository {
  constructor(
    @InjectRepository(CityOrganModel)
    private readonly cityOrganRepository: Repository<CityOrganModel>,
  ) {}

  create(cityOrganEntity: CityOrganEntity): CityOrganModel {
    const cityOrganData = CityOrganMapper.toModel(cityOrganEntity);
    return this.cityOrganRepository.create(cityOrganData);
  }

  async save(
    cityOrganEntity: CityOrganEntity,
  ): AsyncResult<AppException, CityOrganEntity> {
    try {
      const cityOrganModel = this.create(cityOrganEntity);
      await this.cityOrganRepository.save(cityOrganModel);
      return right(CityOrganMapper.toEntity(cityOrganModel));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async findByCityId(
    cityId: number,
  ): AsyncResult<AppException, CityOrganEntity[]> {
    try {
      const cityOrgans = await this.cityOrganRepository.find({
        where: { cityId },
      });
      return right(cityOrgans.map(CityOrganMapper.toEntity));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async findAll(): AsyncResult<AppException, CityOrganEntity[]> {
    try {
      const cityOrgans = await this.cityOrganRepository.find();
      return right(cityOrgans.map(CityOrganMapper.toEntity));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
