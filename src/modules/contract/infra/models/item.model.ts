import { BaseModelIdUuidCreated } from '@/core/models/base_model';
import ItemTypeEnum from '@/modules/contract/domain/entities/item_type.enum';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('contract_items')
export default class ItemModel extends BaseModelIdUuidCreated {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number | null) => (value ? String(value) : null),
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  unitPrice: number | null;

  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => parseFloat(value),
    },
  })
  totalPrice: number;

  @Column({
    name: 'amount_used',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => parseFloat(value),
    },
  })
  amountUsed: number;

  @Column({ name: 'quantity_used', type: 'int', nullable: true })
  quantityUsed: number | null;

  @Column({ name: 'quantity_total', type: 'int', nullable: true })
  quantityTotal: number | null;

  @Column({
    name: 'type',
    enum: ItemTypeEnum,
    type: 'enum',
    default: ItemTypeEnum.PRODUCT,
  })
  type: ItemTypeEnum;

  @ManyToOne(() => ContractModel, contract => contract.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contract_uuid' })
  contract: ContractModel;

  @Column({ name: 'contract_uuid', type: 'uuid' })
  contractUuid: string;
}
