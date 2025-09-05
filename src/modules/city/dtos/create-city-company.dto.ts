import CityCompanyDto from '@/modules/city/dtos/city-company.dto';
import { PickType } from '@nestjs/swagger';

export default class CreateCityCompanyDto extends PickType(CityCompanyDto, [
  'nome',
  'nomeFantasia',
  'cnpj',
  'email',
  'contato',
  'uf',
  'cidade',
  'cityId',
]) {}
