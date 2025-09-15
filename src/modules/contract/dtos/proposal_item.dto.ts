import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export default class ProposalItemDto {
  @IsString()
  @IsUUID()
  proposalId: string;

  @IsString()
  @IsUUID()
  itemId: string;

  @IsNumber()
  @IsOptional()
  @ValidateIf(obj => obj.amountToIncrease !== null)
  amountToIncrease: number | null;
  @ValidateIf(obj => obj.amountToIncrease !== null)
  @IsOptional()
  quantityToIncrease: number | null;
}
