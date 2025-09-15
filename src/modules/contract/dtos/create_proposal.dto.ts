import CreateProposalItemDto from '@/modules/contract/dtos/create_proposal_item.dto';
import ProposalDto from '@/modules/contract/dtos/proposal.dto';
import { PickType } from '@nestjs/swagger';
import { ArrayMinSize, IsArray } from 'class-validator';

export default class CreateProposalDto extends PickType(ProposalDto, [
  'contractUuid',
]) {
  @IsArray()
  @ArrayMinSize(1)
  declare items: CreateProposalItemDto[];
}
