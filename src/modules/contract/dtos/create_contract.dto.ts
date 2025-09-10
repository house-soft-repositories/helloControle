import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateItemDto from '@/modules/contract/dtos/create_item.dto';
import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export default class CreateContractDto extends PickType(ContractDto, [
  'id',
  'nome',
  'descricao',
  'organId',
  'companyId',
]) {
  @IsArray()
  @Transform(({ value }) => {
    try {
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === 'string') {
        return JSON.parse(value);
      }
      return [];
    } catch (error) {
      throw new Error(`Invalid items format: ${error.message}`);
    }
  })
  declare items: CreateItemDto[];

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) {
          throw new Error('Invalid number format');
        }
        return parsed;
      }
      throw new Error('Value must be a number or string');
    } catch (error) {
      throw new Error(`Invalid valorTotal: ${error.message}`);
    }
  })
  declare valorTotal: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      if (typeof value === 'number') {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        if (isNaN(parsed)) {
          throw new Error('Invalid number format');
        }
        return parsed;
      }
      throw new Error('Value must be a number or string');
    } catch (error) {
      throw new Error(`Invalid valorGlosado: ${error.message}`);
    }
  })
  declare valorGlosado: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      if (value instanceof Date) {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = new Date(value);
        if (isNaN(parsed.getTime())) {
          throw new Error('Invalid date format');
        }
        return parsed;
      }
      throw new Error('Value must be a date or string');
    } catch (error) {
      throw new Error(`Invalid dataAssinatura: ${error.message}`);
    }
  })
  declare dataAssinatura: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => {
    try {
      if (value instanceof Date) {
        return value;
      }
      if (typeof value === 'string') {
        const parsed = new Date(value);
        if (isNaN(parsed.getTime())) {
          throw new Error('Invalid date format');
        }
        return parsed;
      }
      throw new Error('Value must be a date or string');
    } catch (error) {
      throw new Error(`Invalid dataVencimento: ${error.message}`);
    }
  })
  declare dataVencimento: Date;

  @IsInt()
  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseInt(value);
  })
  declare organId: number;

  @IsInt()
  @Transform(({ value }) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return parseInt(value);
  })
  declare companyId: number;
}
