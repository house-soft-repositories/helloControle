import { IsNumber, IsString, Length } from 'class-validator';

export default class CityOrganDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsString()
  @Length(8, 9)
  cep: string;

  @IsString()
  @Length(1, 255)
  logradouro: string;

  @IsString()
  @Length(1, 10)
  numero: string;

  @IsString()
  @Length(1, 100)
  bairro: string;

  @IsNumber()
  cityId: number;
}
