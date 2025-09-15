import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export default class ProposalQueryParamsDto {
  @ApiPropertyOptional({})
  @IsOptional()
  @IsString()
  @IsUUID()
  contractUuid?: string;

  @ApiPropertyOptional({ enum: ProposalStatusEnum })
  @IsOptional()
  @IsEnum(ProposalStatusEnum)
  status?: ProposalStatusEnum;

  @ApiPropertyOptional({})
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  createdBy?: number;
}
