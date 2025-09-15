import ItemModel from '@/modules/contract/infra/models/item.model';
import ProposalModel from '@/modules/contract/infra/models/proposal.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proposal_items')
export default class ProposalItemModel {
  @PrimaryColumn({ name: 'proposal_id', type: 'uuid' })
  proposalId: string;

  @PrimaryColumn({ name: 'item_id', type: 'uuid' })
  itemId: string;

  @ManyToOne(() => ProposalModel, proposal => proposal.proposalItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'proposal_id' })
  proposal: ProposalModel;

  @ManyToOne(() => ItemModel, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'item_id' })
  item: ItemModel;

  @Column({
    name: 'amount_to_increase',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: {
      to: (value: number | undefined) => (value ? String(value) : null),
      from: (value: string | null) => (value ? parseFloat(value) : null),
    },
  })
  amountToIncrease: number | null;

  @Column({ name: 'quantity_to_increase', type: 'int', nullable: true })
  quantityToIncrease: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
