import { IsNumber, IsString, Length } from 'class-validator';

export default class CityOrganDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsNumber()
  cityId: number;
}
