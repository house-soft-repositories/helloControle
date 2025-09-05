import ItemDto from '@/modules/contract/dtos/item.dto';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class ContractDto {
  @IsString()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @IsNotEmpty()
  valorTotal: number;

  @IsNumber()
  @IsNotEmpty()
  valorGlosado: number;

  @IsDateString()
  @IsNotEmpty()
  dataAssinatura: Date;

  @IsDateString()
  @IsNotEmpty()
  dataVencimento: Date;

  @IsString()
  @IsNotEmpty()
  orgaoContratante: string;

  @IsString()
  @IsNotEmpty()
  empresaContratada: string;

  @IsString()
  @IsOptional()
  cidadeContratante?: string;

  @IsArray({ each: true })
  items: ItemDto[];

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
