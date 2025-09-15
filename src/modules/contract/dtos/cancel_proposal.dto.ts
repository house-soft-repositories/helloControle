import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export default class CancelProposalDto {
  @ApiProperty({
    description: 'Reason for cancelling the proposal',
    example: 'The proposal no longer meets the project requirements.',
  })
  @IsString()
  @Length(3, 255)
  declare cancelReason: string;
}
