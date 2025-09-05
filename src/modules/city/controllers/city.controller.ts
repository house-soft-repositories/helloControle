import ICreateCityCompanyUseCase, {
  CreateCityCompanyParam,
} from '@/modules/city/domain/usecase/i_create_city_company_use_case';
import ICreateCityOrganUseCase, {
  CreateCityOrganParam,
} from '@/modules/city/domain/usecase/i_create_city_organ_use_case';
import ICreateCityUseCase from '@/modules/city/domain/usecase/i_create_city_use_case';
import IFindAllCitiesUseCase, {
  FindAllCitiesParam,
} from '@/modules/city/domain/usecase/i_find_all_cities_use_case';
import CityCompanyDto from '@/modules/city/dtos/city-company.dto';
import CityOrganDto from '@/modules/city/dtos/city-organ.dto';
import CityDto from '@/modules/city/dtos/city.dto';
import CreateCityCompanyDto from '@/modules/city/dtos/create-city-company.dto';
import CreateCityOrganDto from '@/modules/city/dtos/create-city-organ.dto';
import CreateCityDto from '@/modules/city/dtos/create_city.dto';
import {
  CREATE_CITY_COMPANY_SERVICE,
  CREATE_CITY_ORGAN_SERVICE,
  CREATE_CITY_SERVICE,
  FIND_ALL_CITIES_SERVICE,
} from '@/modules/city/symbols';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Controller('api/city')
export default class CityController {
  constructor(
    @Inject(CREATE_CITY_SERVICE)
    private readonly createCityService: ICreateCityUseCase,
    @Inject(CREATE_CITY_COMPANY_SERVICE)
    private readonly createCityCompanyService: ICreateCityCompanyUseCase,
    @Inject(CREATE_CITY_ORGAN_SERVICE)
    private readonly createCityOrganService: ICreateCityOrganUseCase,
    @Inject(FIND_ALL_CITIES_SERVICE)
    private readonly findAllCitiesService: IFindAllCitiesUseCase,
  ) {}

  @HttpCode(201)
  @Post('')
  async create(@Body() cityData: CreateCityDto) {
    const result = await this.createCityService.execute(cityData);
    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }
    return plainToClass(CityDto, {
      ...result.value.fromResponse(),
    });
  }

  @HttpCode(200)
  @Get('')
  async findAll() {
    const param = new FindAllCitiesParam();
    const result = await this.findAllCitiesService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }

  @HttpCode(201)
  @Post('company')
  async createCompany(@Body() companyData: CreateCityCompanyDto) {
    const param = new CreateCityCompanyParam(
      companyData.nome,
      companyData.nomeFantasia,
      companyData.cnpj,
      companyData.email,
      companyData.contato,
      companyData.uf,
      companyData.cidade,
      companyData.cityId,
    );

    const result = await this.createCityCompanyService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return plainToClass(CityCompanyDto, {
      ...result.value.fromResponse(),
    });
  }

  @HttpCode(201)
  @Post('organ')
  async createOrgan(@Body() organData: CreateCityOrganDto) {
    const param = new CreateCityOrganParam(organData.nome, organData.cityId);

    const result = await this.createCityOrganService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return plainToClass(CityOrganDto, {
      ...result.value.fromResponse(),
    });
  }
}
