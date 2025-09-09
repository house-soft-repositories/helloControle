import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import CityRepositoryException from '@/modules/city/exceptions/city_repository.exception';
import CityOrganMapper from '@/modules/city/infra/mapper/city-organ.mapper';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';
import { CityOrganQueryOptions } from '@/modules/city/infra/query/query_objects';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOneOptions, Repository } from 'typeorm';

export default class CityOrganRepository implements ICityOrganRepository {
  constructor(
    @InjectRepository(CityOrganModel)
    private readonly cityOrganRepository: Repository<CityOrganModel>,
  ) {}
  async findOne(
    query: CityOrganQueryOptions,
  ): AsyncResult<AppException, CityOrganEntity> {
    try {
      let options: FindOneOptions<CityOrganModel> = {
        relations: query.relations,
        select: query.selectFields,
      };

      if (query.organId) {
        options = { ...options, where: { id: query.organId } };
      }
      return right(
        CityOrganMapper.toEntity(
          await this.cityOrganRepository.findOneOrFail(options),
        ),
      );
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return left(
          new CityRepositoryException(ErrorMessages.ORGAN_NOT_FOUND, 404),
        );
      }
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500,  error),
      );
    }
  }

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

  async findById(id: number): AsyncResult<AppException, CityOrganEntity> {
    try {
      const cityOrgan = await this.cityOrganRepository.findOne({
        where: { id },
      });
      if (!cityOrgan) {
        return left(new CityRepositoryException('City organ not found', 404));
      }
      return right(CityOrganMapper.toEntity(cityOrgan));
    } catch (error) {
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }

  async update(
    id: number,
    cityOrganEntity: CityOrganEntity,
  ): AsyncResult<AppException, CityOrganEntity> {
    try {
      const existingOrgan = await this.cityOrganRepository.findOne({
        where: { id },
      });
      if (!existingOrgan) {
        return left(new CityRepositoryException('City organ not found', 404));
      }

      // Mapear apenas os campos que não são undefined
      const updatedData = CityOrganMapper.toModel(cityOrganEntity);

      // Remover propriedades undefined para evitar problemas no update
      const filteredData = Object.fromEntries(
        Object.entries(updatedData).filter(([_, value]) => value !== undefined),
      );

      // Usar merge e save em vez de update para garantir que as mudanças sejam aplicadas
      const mergedEntity = this.cityOrganRepository.merge(
        existingOrgan,
        filteredData,
      );
      const savedEntity = await this.cityOrganRepository.save(mergedEntity);

      return right(CityOrganMapper.toEntity(savedEntity));
    } catch (error) {
      console.error('CityOrganRepository - Update error:', error);
      return left(
        new CityRepositoryException(ErrorMessages.UNEXPECTED_ERROR, 500, error),
      );
    }
  }
}
