import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export default class ProposalQueryParamsDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  contractUuid?: string;

  @IsOptional()
  @IsEnum(ProposalStatusEnum)
  status?: ProposalStatusEnum;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  createdBy?: number;
}
