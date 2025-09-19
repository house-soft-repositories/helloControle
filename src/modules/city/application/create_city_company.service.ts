import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityCompanyRepository from '@/modules/city/adapters/i_city_company_repository';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import ICreateCityCompanyUseCase, {
  CreateCityCompanyParam,
  CreateCityCompanyResponse,
} from '@/modules/city/domain/usecase/i_create_city_company_use_case';

export default class CreateCityCompanyService
  implements ICreateCityCompanyUseCase
{
  constructor(private readonly cityCompanyRepository: ICityCompanyRepository) {}

  async execute(
    param: CreateCityCompanyParam,
  ): AsyncResult<AppException, CreateCityCompanyResponse> {
    const cityCompanyEntity = new CityCompanyEntity({
      nome: param.nome,
      nomeFantasia: param.nomeFantasia,
      cnpj: param.cnpj,
      email: param.email,
      contato: param.contato,
      uf: param.uf,
      cidade: param.cidade,
      cep: param.cep,
      logradouro: param.logradouro,
      numero: param.numero,
      bairro: param.bairro,
      cityId: param.cityId,
    });

    const savedCityCompanyResult =
      await this.cityCompanyRepository.save(cityCompanyEntity);

    if (savedCityCompanyResult.isLeft()) {
      return left(savedCityCompanyResult.value);
    }

    return right(new CreateCityCompanyResponse(savedCityCompanyResult.value));
  }
}
