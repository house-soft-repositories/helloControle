import ItemTypeEnum from '@/modules/contract/domain/entities/item_type.enum';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export default class ItemDto {
  @IsString()
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsString()
  @ValidateIf(o => o.description !== null)
  description: string;

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  @ValidateIf(o => o.type === ItemTypeEnum.SERVICE)
  totalPrice?: number;

  @IsNumber()
  amountUsed: number;

  @IsNumber()
  @ValidateIf(o => o.type === ItemTypeEnum.PRODUCT)
  quantityUsed: number | null;

  @IsNumber()
  @ValidateIf(o => o.type === ItemTypeEnum.PRODUCT)
  quantityTotal: number | null;

  @IsEnum(ItemTypeEnum)
  type: ItemTypeEnum;

  @IsString()
  @IsUUID()
  contractUuid: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
