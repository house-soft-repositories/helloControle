import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class IncreaseUsedAmountItemsDto {
  @IsArray()
  items: IncreaseUsedAmountItemDto[];
}

export class IncreaseUsedAmountItemDto {
  @IsString()
  @IsUUID()
  itemId: string;

  @IsNumber()
  @IsOptional()
  amountToIncrease?: number;

  @IsNumber()
  @IsOptional()
  quantityToIncrease?: number;
}
