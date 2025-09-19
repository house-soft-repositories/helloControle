import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import ICreateCityOrganUseCase, {
  CreateCityOrganParam,
  CreateCityOrganResponse,
} from '@/modules/city/domain/usecase/i_create_city_organ_use_case';

export default class CreateCityOrganService implements ICreateCityOrganUseCase {
  constructor(private readonly cityOrganRepository: ICityOrganRepository) {}

  async execute(
    param: CreateCityOrganParam,
  ): AsyncResult<AppException, CreateCityOrganResponse> {
    const cityOrganEntity = new CityOrganEntity({
      nome: param.nome,
      cep: param.cep,
      logradouro: param.logradouro,
      numero: param.numero,
      bairro: param.bairro,
      cityId: param.cityId,
    });

    const savedCityOrganResult =
      await this.cityOrganRepository.save(cityOrganEntity);

    if (savedCityOrganResult.isLeft()) {
      return left(savedCityOrganResult.value);
    }

    return right(new CreateCityOrganResponse(savedCityOrganResult.value));
  }
}
