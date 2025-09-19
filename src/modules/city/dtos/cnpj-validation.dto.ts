import { IsEmail, IsOptional, IsString } from 'class-validator';

export default class CnpjValidationDto {
  @IsString()
  cnpj: string;

  @IsString()
  nome: string; // razao_social

  @IsOptional()
  @IsString()
  nomeFantasia?: string; // nome_fantasia

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  contato?: string; // ddd_telefone_1

  @IsString()
  uf: string;

  @IsString()
  cidade: string; // municipio

  @IsOptional()
  @IsString()
  logradouro?: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  situacao?: string; // descricao_situacao_cadastral

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  complemento?: string; // complemento
}
