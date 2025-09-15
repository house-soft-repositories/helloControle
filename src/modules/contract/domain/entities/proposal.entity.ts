import ProposalItemEntity from '@/modules/contract/domain/entities/proposal_item.entity';
import ProposalStatusEnum from '@/modules/contract/domain/entities/proposal_status_enum';
import ProporsalDomainException from '@/modules/contract/exceptions/proporsal_domain.exception';
import { randomUUID } from 'crypto';

interface ProposalEntityProps {
  id?: string;
  contractUuid: string;
  items: ProposalItemEntity[];
  status: ProposalStatusEnum;
  approvedBy?: number | null;
  approvedAt?: Date | null;
  canceledBy?: number | null;
  cancelReason?: string | null;
  canceledAt?: Date | null;
  createdBy: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class ProposalEntity {
  private constructor(private readonly props: ProposalEntityProps) {
    this.props = {
      id: props.id ?? randomUUID().toString(),
      contractUuid: props.contractUuid,
      items: props.items,
      status: props.status,
      approvedBy: props.approvedBy ?? null,
      approvedAt: props.approvedAt ?? null,
      canceledBy: props.canceledBy ?? null,
      cancelReason: props.cancelReason ?? null,
      canceledAt: props.canceledAt ?? null,
      createdBy: props.createdBy,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }
  static create(props: ProposalEntityProps) {
    if (props.status !== ProposalStatusEnum.PENDING) {
      throw new ProporsalDomainException('New proposal status must be pending');
    }
    this.validate(props);
    return new ProposalEntity(props);
  }
  static fromData(props: ProposalEntityProps) {
    return new ProposalEntity(props);
  }
  static validate(props: Partial<ProposalEntityProps>) {
    if (props.items && props.items.length === 0) {
      throw new ProporsalDomainException('Items list cannot be empty');
    }
    if (!props.contractUuid) {
      throw new ProporsalDomainException('Contract UUID is required');
    }
    if (!props.createdBy) {
      throw new ProporsalDomainException('Created by is required');
    }
    if (props.status && !ProposalStatusEnum[props.status]) {
      throw new ProporsalDomainException('Invalid proposal status');
    }
  }
  get id() {
    return this.props.id;
  }
  get contractUuid() {
    return this.props.contractUuid;
  }
  get items() {
    return this.props.items;
  }
  get status() {
    return this.props.status;
  }
  get approvedBy() {
    return this.props.approvedBy;
  }
  get approvedAt() {
    return this.props.approvedAt;
  }
  get canceledBy() {
    return this.props.canceledBy;
  }
  get cancelReason() {
    return this.props.cancelReason;
  }
  get canceledAt() {
    return this.props.canceledAt;
  }
  get createdBy() {
    return this.props.createdBy;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  cancelProposal(canceledBy: number, cancelReason: string) {
    if (this.props.status !== ProposalStatusEnum.PENDING) {
      throw new ProporsalDomainException(
        'Only pending proposals can be canceled',
      );
    }
    if (!canceledBy) {
      throw new ProporsalDomainException('Canceled by is required');
    }
    if (!cancelReason) {
      throw new ProporsalDomainException('Cancel reason is required');
    }
    this.props.status = ProposalStatusEnum.CANCELLED;
    this.props.canceledBy = canceledBy;
    this.props.cancelReason = cancelReason;
    this.props.canceledAt = new Date();
    this.toTouch();
  }
  approveProposal(acceptedBy: number) {
    if (this.props.status !== ProposalStatusEnum.PENDING) {
      throw new ProporsalDomainException(
        'Only pending proposals can be accepted',
      );
    }
    if (!acceptedBy) {
      throw new ProporsalDomainException('Accepted by is required');
    }
    this.props.status = ProposalStatusEnum.APPROVED;
    this.props.approvedBy = acceptedBy;
    this.props.approvedAt = new Date();
    this.toTouch();
  }

  private toTouch() {
    this.props.updatedAt = new Date();
  }
  toObject() {
    return {
      id: this.id,
      contractUuid: this.contractUuid,
      status: this.status,
      approvedBy: this.approvedBy,
      approvedAt: this.approvedAt,
      canceledBy: this.canceledBy,
      cancelReason: this.cancelReason,
      canceledAt: this.canceledAt,
      items: this.items.map(item => item.toObject()),
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
