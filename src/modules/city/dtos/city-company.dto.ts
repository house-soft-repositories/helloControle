import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export default class CityCompanyDto {
  @IsNumber()
  id: number;

  @IsString()
  @Length(1, 255)
  nome: string;

  @IsString()
  @IsOptional()
  @Length(1, 255)
  nomeFantasia?: string;

  @IsString()
  @Length(14, 18)
  cnpj: string;

  @IsEmail()
  @Length(1, 255)
  email: string;

  @IsString()
  @Length(1, 20)
  contato: string;

  @IsString()
  @Length(2, 2)
  uf: string;

  @IsString()
  @Length(1, 255)
  cidade: string;

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
