import ItemDto from '@/modules/contract/dtos/item.dto';
import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsInt,
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

  @IsInt()
  @IsEmpty()
  organId: number | null;

  @IsInt()
  @IsEmpty()
  companyId: number | null;

  @IsInt()
  @IsEmpty()
  cityId: number | null;

  @IsArray({ each: true })
  items: ItemDto[];

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}
