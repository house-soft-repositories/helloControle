import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import CityRepositoryException from '@/modules/city/exceptions/city_repository.exception';
import CityMapper from '@/modules/city/infra/mapper/city.mapper';
import CityModel from '@/modules/city/infra/models/city.model';
import { CityQueryOptions } from '@/modules/city/infra/query/query_objects';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';

export default class CityRepository implements ICityRepository {
  constructor(
    @InjectRepository(CityModel)
    private readonly cityRepository: Repository<CityModel>,
  ) {}
  async findOne(
    query: CityQueryOptions,
  ): AsyncResult<AppException, CityEntity> {
    try {
      const findOptions: FindOneOptions<CityModel> = {
        where: {
          id: query.cityId,
        },
        relations: query.relations,
        select: query.selectFields,
      };

      return right(
        CityMapper.toEntity(
          await this.cityRepository.findOneOrFail(findOptions),
        ),
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return left(CityRepositoryException.cityNotFound(query.cityId));
      }
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
  create(cityEntity: CityEntity): CityModel {
    const cityData = CityMapper.toModel(cityEntity);
    return this.cityRepository.create(cityData);
  }
  async save(cityEntity: CityEntity): AsyncResult<AppException, CityEntity> {
    try {
      const cityModel = this.create(cityEntity);

      await this.cityRepository.save(cityModel);

      return right(CityMapper.toEntity(cityModel));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async findAll(): AsyncResult<AppException, CityEntity[]> {
    try {
      const cityModels = await this.cityRepository.find({
        relations: ['companies', 'organs'],
        order: {
          name: 'ASC',
        },
      });

      const cityEntities = cityModels.map(cityModel =>
        CityMapper.toEntity(cityModel),
      );

      return right(cityEntities);
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
