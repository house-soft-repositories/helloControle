import CityDto from '@/modules/city/dtos/city.dto';
import { PickType } from '@nestjs/swagger';

export default class CreateCityDto extends PickType(CityDto, [
  'name',
  'state',
]) {}
