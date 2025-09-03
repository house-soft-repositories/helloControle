import ICreateCityUseCase from '@/modules/city/domain/usecase/i_create_city_use_case';
import CityDto from '@/modules/city/dtos/city.dto';
import CreateCityDto from '@/modules/city/dtos/create_city.dto';
import { CREATE_CITY_SERVICE } from '@/modules/city/symbols';
import {
  Body,
  Controller,
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
}
