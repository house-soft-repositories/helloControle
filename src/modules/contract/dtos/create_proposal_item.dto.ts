import ProposalItemDto from '@/modules/contract/dtos/proposal_item.dto';
import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IsOptional } from 'class-validator/types/decorator/common/IsOptional';

export default class CreateProposalItemDto extends PickType(ProposalItemDto, [
  'itemId',
]) {
  @IsNumber()
  @IsOptional()
  amountToIncrease?: number;

  @IsNumber()
  @IsOptional()
  quantityToIncrease?: number;
}
