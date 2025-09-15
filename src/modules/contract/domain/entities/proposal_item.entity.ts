interface ProposalItemEntityProps {
  proposalId: string;
  itemId: string;
  amountToIncrease?: number | null;
  quantityToIncrease?: number | null;
}
export default class ProposalItemEntity {
  private constructor(private readonly props: ProposalItemEntityProps) {
    this.props = {
      proposalId: props.proposalId,
      itemId: props.itemId,
      amountToIncrease: props.amountToIncrease ?? null,
      quantityToIncrease: props.quantityToIncrease ?? null,
    };
  }

  static create(props: ProposalItemEntityProps) {
    return new ProposalItemEntity(props);
  }
  static fromData(props: ProposalItemEntityProps) {
    return new ProposalItemEntity(props);
  }
  get proposalId() {
    return this.props.proposalId;
  }
  get itemId() {
    return this.props.itemId;
  }
  get amountToIncrease() {
    return this.props.amountToIncrease;
  }
  get quantityToIncrease() {
    return this.props.quantityToIncrease;
  }

  toObject() {
    return {
      itemId: this.itemId,
      proposalId: this.proposalId,
      amountToIncrease: this.amountToIncrease,
      quantityToIncrease: this.quantityToIncrease,
    };
  }
}
