import ICreateCityUseCase from '@/modules/city/domain/usecase/i_create_city_use_case';
import IFindAllCitiesUseCase, {
  FindAllCitiesParam,
} from '@/modules/city/domain/usecase/i_find_all_cities_use_case';
import CityDto from '@/modules/city/dtos/city.dto';
import CreateCityDto from '@/modules/city/dtos/create_city.dto';
import {
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
}
