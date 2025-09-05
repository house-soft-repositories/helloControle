import ContractDto from '@/modules/contract/dtos/contract.dto';
import CreateItemDto from '@/modules/contract/dtos/create_item.dto';
import { PickType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export default class CreateContractDto extends PickType(ContractDto, [
  'id',
  'nome',
  'descricao',
  'valorTotal',
  'valorGlosado',
  'dataAssinatura',
  'dataVencimento',
  'orgaoContratante',
  'empresaContratada',
  'cidadeContratante',
]) {
  @IsArray()
  declare items: CreateItemDto[];
}
