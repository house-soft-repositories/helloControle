import AppException from '@/core/exceptions/app_exception';
import AsyncResult from '@/core/types/async_result';
import { left, right } from '@/core/types/either';
import ICityCompanyRepository from '@/modules/city/adapters/i_city_company_repository';
import CityCompanyEntity from '@/modules/city/domain/entities/city-company.entity';
import IUpdateCityCompanyUseCase, {
  UpdateCityCompanyParam,
  UpdateCityCompanyResponse,
} from '@/modules/city/domain/usecase/i_update_city_company_use_case';

export default class UpdateCityCompanyService
  implements IUpdateCityCompanyUseCase
{
  constructor(private readonly cityCompanyRepository: ICityCompanyRepository) {}

  async execute(
    param: UpdateCityCompanyParam,
  ): AsyncResult<AppException, UpdateCityCompanyResponse> {
    console.log('UpdateCityCompanyService - Received param:', param);

    // Primeiro, buscar a company existente
    const existingCompanyResult = await this.cityCompanyRepository.findById(
      param.id,
    );

    if (existingCompanyResult.isLeft()) {
      return left(existingCompanyResult.value);
    }

    const existingCompany = existingCompanyResult.value;
    console.log(
      'UpdateCityCompanyService - Existing company:',
      existingCompany.toObject(),
    );

    // Criar uma nova entidade com os dados atualizados
    const updatedCompany = new CityCompanyEntity({
      id: existingCompany.id,
      nome: param.nome ?? existingCompany.nome,
      nomeFantasia: param.nomeFantasia ?? existingCompany.nomeFantasia,
      cnpj: param.cnpj ?? existingCompany.cnpj,
      email: param.email ?? existingCompany.email,
      contato: param.contato ?? existingCompany.contato,
      uf: param.uf ?? existingCompany.uf,
      cidade: param.cidade ?? existingCompany.cidade,
      cityId: param.cityId ?? existingCompany.cityId,
      createdAt: existingCompany.createdAt,
      updatedAt: new Date(),
    });

    console.log(
      'UpdateCityCompanyService - Updated company data:',
      updatedCompany.toObject(),
    );

    const updateResult = await this.cityCompanyRepository.update(
      param.id,
      updatedCompany,
    );

    if (updateResult.isLeft()) {
      return left(updateResult.value);
    }

    console.log(
      'UpdateCityCompanyService - Final result:',
      updateResult.value.toObject(),
    );
    return right(new UpdateCityCompanyResponse(updateResult.value));
  }
}
