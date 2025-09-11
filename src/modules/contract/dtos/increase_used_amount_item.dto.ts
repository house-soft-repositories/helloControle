import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export default class IncreaseUsedAmountItemDto {
  @IsString()
  @IsUUID()
  itemId: string;

  @IsNumber()
  @IsOptional()
  amountToIncrease: number;

  @IsNumber()
  @IsOptional()
  quantityToIncrease?: number;
}
