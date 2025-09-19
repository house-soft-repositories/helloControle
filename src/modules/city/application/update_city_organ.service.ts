import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityOrganRepository from '@/modules/city/adapters/i_city_organ_repository';
import CityOrganEntity from '@/modules/city/domain/entities/city-organ.entity';
import IUpdateCityOrganUseCase, {
  UpdateCityOrganParam,
  UpdateCityOrganResponse,
} from '@/modules/city/domain/usecase/i_update_city_organ_use_case';

export default class UpdateCityOrganService implements IUpdateCityOrganUseCase {
  constructor(private readonly cityOrganRepository: ICityOrganRepository) {}

  async execute(
    param: UpdateCityOrganParam,
  ): AsyncResult<AppException, UpdateCityOrganResponse> {
    // Primeiro, buscar o organ existente
    const existingOrganResult = await this.cityOrganRepository.findById(
      param.id,
    );

    if (existingOrganResult.isLeft()) {
      return left(existingOrganResult.value);
    }

    const existingOrgan = existingOrganResult.value;

    // Criar uma nova entidade com os dados atualizados
    const updatedOrgan = new CityOrganEntity({
      id: existingOrgan.id,
      nome: param.nome ?? existingOrgan.nome,
      cep: param.cep ?? existingOrgan.cep,
      logradouro: param.logradouro ?? existingOrgan.logradouro,
      numero: param.numero ?? existingOrgan.numero,
      bairro: param.bairro ?? existingOrgan.bairro,
      cityId: param.cityId ?? existingOrgan.cityId,
      createdAt: existingOrgan.createdAt,
      updatedAt: new Date(),
    });

    const updateResult = await this.cityOrganRepository.update(
      param.id,
      updatedOrgan,
    );

    if (updateResult.isLeft()) {
      return left(updateResult.value);
    }

    return right(new UpdateCityOrganResponse(updateResult.value));
  }
}
