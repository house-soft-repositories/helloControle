import { BaseModelIdUuidCreated } from '@/core/models/base_model';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import ProposalItemModel from '@/modules/contract/infra/models/proposal-item.model';
import UserModel from '@/modules/users/infra/models/user.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('proposals')
export default class ProposalModel extends BaseModelIdUuidCreated {
  @ManyToOne(() => ContractModel, {
    cascade: true,
  })
  @JoinColumn({ name: 'contract_uuid' })
  contract: ContractModel;

  @Column({ name: 'contract_uuid' })
  contractUuid: string;

  @OneToMany(() => ProposalItemModel, proposalItem => proposalItem.proposal, {
    cascade: true,
    eager: true,
  })
  proposalItems: ProposalItemModel[];

  @Column({
    name: 'status',
    enum: ProposalStatusEnum,
    type: 'enum',
    default: ProposalStatusEnum.PENDING,
  })
  status: ProposalStatusEnum;

  @ManyToOne(() => UserModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by' })
  approvedByUser: UserModel | null;

  @Column({ name: 'approved_by', type: 'int', nullable: true })
  approvedBy: number | null;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date | null;

  @ManyToOne(() => UserModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'canceled_by' })
  canceledByUser: UserModel | null;

  @Column({ name: 'canceled_by', type: 'int', nullable: true })
  canceledBy: number | null;

  @Column({ name: 'cancel_reason', type: 'text', nullable: true })
  cancelReason: string | null;

  @Column({ name: 'canceled_at', type: 'timestamp', nullable: true })
  canceledAt: Date | null;

  @ManyToOne(() => UserModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdByUser: UserModel | null;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  createdBy: number | null;
}
