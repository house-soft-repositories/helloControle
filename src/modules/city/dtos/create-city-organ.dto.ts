import CityOrganDto from '@/modules/city/dtos/city-organ.dto';
import { PickType } from '@nestjs/swagger';

export default class CreateCityOrganDto extends PickType(CityOrganDto, [
  'nome',
  'cep',
  'logradouro',
  'numero',
  'bairro',
  'cityId',
]) {}
