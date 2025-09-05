import ItemDto from '@/modules/contract/dtos/item.dto';
import { PickType } from '@nestjs/swagger';

export default class CreateItemDto extends PickType(ItemDto, [
  'name',
  'description',
  'unitPrice',
  'totalPrice',
  'amountUsed',
  'quantityUsed',
  'quantityTotal',
  'type',
]) {}
