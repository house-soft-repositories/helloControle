import { User } from '@/core/decorators/user_request.decorator';
import AuthGuard from '@/core/guard/auth.guard';
import CepConsultationService from '@/modules/city/application/cep-consultation.service';
import CnpjValidationService from '@/modules/city/application/cnpj-validation.service';
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
import IFindAllCityCompaniesUseCase, {
  FindAllCityCompaniesParam,
} from '@/modules/city/domain/usecase/i_find_all_city_companies_use_case';
import IFindAllCityOrgansUseCase, {
  FindAllCityOrgansParam,
} from '@/modules/city/domain/usecase/i_find_all_city_organs_use_case';
import IFindCityCompanyByIdUseCase, {
  FindCityCompanyByIdParam,
} from '@/modules/city/domain/usecase/i_find_city_company_by_id_use_case';
import IFindCityOrganByIdUseCase, {
  FindCityOrganByIdParam,
} from '@/modules/city/domain/usecase/i_find_city_organ_by_id_use_case';
import IFindCompaniesByCityIdUseCase from '@/modules/city/domain/usecase/i_find_companies_by_city_id_use_case';
import IFindOrgansByCityIdUseCase from '@/modules/city/domain/usecase/i_find_organs_by_city_id_use_case';
import IUpdateCityCompanyUseCase, {
  UpdateCityCompanyParam,
} from '@/modules/city/domain/usecase/i_update_city_company_use_case';
import IUpdateCityOrganUseCase, {
  UpdateCityOrganParam,
} from '@/modules/city/domain/usecase/i_update_city_organ_use_case';
import CityCompanyDto from '@/modules/city/dtos/city-company.dto';
import CityOrganDto from '@/modules/city/dtos/city-organ.dto';
import CityDto from '@/modules/city/dtos/city.dto';
import CnpjValidationDto from '@/modules/city/dtos/cnpj-validation.dto';
import CreateCityCompanyDto from '@/modules/city/dtos/create-city-company.dto';
import CreateCityOrganDto from '@/modules/city/dtos/create-city-organ.dto';
import CreateCityDto from '@/modules/city/dtos/create_city.dto';
import UpdateCityCompanyDto from '@/modules/city/dtos/update-city-company.dto';
import UpdateCityOrganDto from '@/modules/city/dtos/update-city-organ.dto';
import ViaCepResponseDto from '@/modules/city/dtos/viacep-response.dto';
import {
  CNPJ_VALIDATION_SERVICE,
  CREATE_CITY_COMPANY_SERVICE,
  CREATE_CITY_ORGAN_SERVICE,
  CREATE_CITY_SERVICE,
  FIND_ALL_CITIES_SERVICE,
  FIND_ALL_CITY_COMPANIES_SERVICE,
  FIND_ALL_CITY_ORGANS_SERVICE,
  FIND_CITY_COMPANY_BY_ID_SERVICE,
  FIND_CITY_ORGAN_BY_ID_SERVICE,
  FIND_COMPANIES_BY_CITY_ID_SERVICE,
  FIND_ORGANS_BY_CITY_ID_SERVICE,
  UPDATE_CITY_COMPANY_SERVICE,
  UPDATE_CITY_ORGAN_SERVICE,
} from '@/modules/city/symbols';
import UserDto from '@/modules/users/dtos/user.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
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
    @Inject(FIND_ALL_CITY_COMPANIES_SERVICE)
    private readonly findAllCityCompaniesService: IFindAllCityCompaniesUseCase,
    @Inject(FIND_CITY_COMPANY_BY_ID_SERVICE)
    private readonly findCityCompanyByIdService: IFindCityCompanyByIdUseCase,
    @Inject(UPDATE_CITY_COMPANY_SERVICE)
    private readonly updateCityCompanyService: IUpdateCityCompanyUseCase,
    @Inject(FIND_ALL_CITY_ORGANS_SERVICE)
    private readonly findAllCityOrgansService: IFindAllCityOrgansUseCase,
    @Inject(FIND_CITY_ORGAN_BY_ID_SERVICE)
    private readonly findCityOrganByIdService: IFindCityOrganByIdUseCase,
    @Inject(UPDATE_CITY_ORGAN_SERVICE)
    private readonly updateCityOrganService: IUpdateCityOrganUseCase,
    @Inject(FIND_COMPANIES_BY_CITY_ID_SERVICE)
    private readonly findCompaniesByCityIdService: IFindCompaniesByCityIdUseCase,
    @Inject(FIND_ORGANS_BY_CITY_ID_SERVICE)
    private readonly findOrgansByCityIdService: IFindOrgansByCityIdUseCase,
    @Inject(CNPJ_VALIDATION_SERVICE)
    private readonly cnpjValidationService: CnpjValidationService,
    private readonly cepConsultationService: CepConsultationService,
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

  @HttpCode(200)
  @Get('organs-by-city')
  @UseGuards(AuthGuard)
  async findOrgansByCityId(@User() userDto: UserDto) {
    if (userDto.currentCityId === null) {
      throw new HttpException('User has no city selected', 400);
    }
    const result = await this.findOrgansByCityIdService.execute({
      cityId: userDto.currentCityId,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }

  @HttpCode(200)
  @Get('companies-by-city')
  @UseGuards(AuthGuard)
  async findCompaniesByCityId(@User() userDto: UserDto) {
    if (userDto.currentCityId === null) {
      throw new HttpException('User has no city selected', 400);
    }
    const result = await this.findCompaniesByCityIdService.execute({
      cityId: userDto.currentCityId,
    });

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }

  @HttpCode(200)
  @Get('company/validate-cnpj/:cnpj')
  async validateCnpj(@Param('cnpj') cnpj: string): Promise<CnpjValidationDto> {
    const result = await this.cnpjValidationService.validateCnpj(cnpj);
    return result;
  }

  @HttpCode(200)
  @Get('cep/:cep')
  async consultCep(@Param('cep') cep: string): Promise<ViaCepResponseDto> {
    console.log('Consultando CEP:', cep);
    const result = await this.cepConsultationService.consultCep(cep);
    return result;
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
      companyData.cep,
      companyData.logradouro,
      companyData.numero,
      companyData.bairro,
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
    const param = new CreateCityOrganParam(
      organData.nome,
      organData.cep,
      organData.logradouro,
      organData.numero,
      organData.bairro,
      organData.cityId,
    );

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

  // Endpoints para Company
  @HttpCode(200)
  @Get('company')
  async findAllCompanies() {
    const param = new FindAllCityCompaniesParam();
    const result = await this.findAllCityCompaniesService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }

  @HttpCode(200)
  @Get('company/:id')
  async findCompanyById(@Param('id', ParseIntPipe) id: number) {
    const param = new FindCityCompanyByIdParam(id);
    const result = await this.findCityCompanyByIdService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return plainToClass(CityCompanyDto, {
      ...result.value.fromResponse(),
    });
  }

  @HttpCode(200)
  @Patch('company/:id')
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() companyData: UpdateCityCompanyDto,
  ) {
    const param = new UpdateCityCompanyParam(
      id,
      companyData?.nome,
      companyData?.nomeFantasia,
      companyData?.cnpj,
      companyData?.email,
      companyData?.contato,
      companyData?.uf,
      companyData?.cidade,
      companyData?.cep,
      companyData?.logradouro,
      companyData?.numero,
      companyData?.bairro,
      companyData?.cityId,
    );

    const result = await this.updateCityCompanyService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return plainToClass(CityCompanyDto, {
      ...result.value.fromResponse(),
    });
  }

  // Endpoints para Organ
  @HttpCode(200)
  @Get('organ')
  async findAllOrgans() {
    const param = new FindAllCityOrgansParam();
    const result = await this.findAllCityOrgansService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return result.value.fromResponse();
  }

  @HttpCode(200)
  @Get('organ/:id')
  async findOrganById(@Param('id', ParseIntPipe) id: number) {
    const param = new FindCityOrganByIdParam(id);
    const result = await this.findCityOrganByIdService.execute(param);

    if (result.isLeft()) {
      throw new HttpException(result.value, result.value.statusCode, {
        cause: result.value.cause,
      });
    }

    return plainToClass(CityOrganDto, {
      ...result.value.fromResponse(),
    });
  }

  @HttpCode(200)
  @Patch('organ/:id')
  async updateOrgan(
    @Param('id', ParseIntPipe) id: number,
    @Body() organData: UpdateCityOrganDto,
  ) {
    const param = new UpdateCityOrganParam(
      id,
      organData?.nome,
      organData?.cep,
      organData?.logradouro,
      organData?.numero,
      organData?.bairro,
      organData?.cityId,
    );

    const result = await this.updateCityOrganService.execute(param);

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
