import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ProposalItemDto from '@/modules/contract/dtos/proposal_item.dto';
import {
  IsArray,
  IsDate,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export default class ProposalDto {
  @IsString()
  @IsUUID()
  id: string;
  @IsString()
  @IsUUID()
  contractUuid: string;

  @IsArray()
  items: ProposalItemDto[];

  @IsEnum(ProposalStatusEnum)
  status: ProposalStatusEnum;

  @IsString()
  @IsUUID()
  approvedBy: number | null;
  @IsDate()
  @IsEmpty()
  approvedAt: Date | null;
  @IsNumber()
  @IsOptional()
  canceledBy: number | null;

  @IsString()
  @IsOptional()
  cancelReason: string | null;

  @IsDate()
  @IsEmpty()
  canceledAt: Date | null;

  @IsNumber()
  @IsOptional()
  createdBy: number | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
