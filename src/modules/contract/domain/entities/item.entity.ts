import ItemTypeEnum from '@/modules/contract/domain/entities/item_type.enum';
import ItemDomainException from '@/modules/contract/exceptions/item_domain.exception';
import { randomUUID } from 'crypto';

interface ItemEntityProps {
  id?: string;
  name: string;
  description?: string | null;
  unitPrice: number | null;
  totalPrice?: number;
  amountUsed: number;
  quantityUsed?: number | null;
  quantityTotal?: number | null;
  type: ItemTypeEnum;
  contractUuid: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default class ItemEntity {
  constructor(private readonly props: ItemEntityProps) {
    this.props = {
      id: props.id ?? randomUUID().toString(),
      contractUuid: props.contractUuid,
      name: props.name,
      description: props.description ?? null,
      unitPrice: props.unitPrice,
      totalPrice: props.totalPrice,
      amountUsed: props.amountUsed,
      quantityUsed: props.quantityUsed,
      quantityTotal: props.quantityTotal,
      type: props.type,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }
  static validate(props: ItemEntityProps) {
    if (!ItemTypeEnum[props.type]) {
      throw new ItemDomainException('Invalid item type');
    }
    if (!props.name) {
      throw new ItemDomainException('Name is required');
    }
    if (props.amountUsed < 0) {
      throw new ItemDomainException(
        'Amount used must be greater than or equal to 0',
      );
    }
    if (props.type === ItemTypeEnum.SERVICE) {
      if (!props.totalPrice) {
        throw new ItemDomainException('Item type service must have totalPrice');
      }
      if (props.amountUsed > props.totalPrice) {
        throw new ItemDomainException(
          'Amount used must be than or equal to total price',
        );
      }
    }

    if (props.type === ItemTypeEnum.PRODUCT) {
      if (props.quantityTotal == null || props.quantityTotal <= 0) {
        throw new ItemDomainException('Product must have quantityTotal > 0');
      }
      if (props.quantityUsed == null || props.quantityUsed < 0) {
        throw new ItemDomainException('Product must have quantityUsed >= 0');
      }
      if (props.quantityUsed > props.quantityTotal) {
        throw new ItemDomainException(
          'Quantity used must be than or equal to quantity total',
        );
      }
    }
  }

  static create(props: ItemEntityProps) {
    props.amountUsed = 0;

    let totalPrice = props.totalPrice;

    if (props.type === ItemTypeEnum.PRODUCT) {
      if (props.quantityTotal == null || props.unitPrice == null) {
        throw new ItemDomainException(
          'Product must have quantityTotal and unitPrice defined',
        );
      }
      props.quantityUsed = 0;
      totalPrice = props.unitPrice * props.quantityTotal;
    }
    if (props.type === ItemTypeEnum.SERVICE) {
      if (totalPrice == null) {
        throw new ItemDomainException('Service must have totalPrice');
      }
      props.unitPrice = null;
      props.quantityTotal = null;
      props.quantityUsed = null;
    }
    this.validate({ ...props, totalPrice });
    return new ItemEntity({
      ...props,
      totalPrice: totalPrice,
    });
  }

  static fromData(props: ItemEntityProps) {
    return new ItemEntity(props);
  }

  updateAmountUsed(newAmountUsed: number) {
    if (newAmountUsed < 0) {
      throw new ItemDomainException(
        'Amount used must be greater than or equal to zero',
      );
    }
    if (this.props.totalPrice == null) {
      throw new ItemDomainException('Total price must be defined');
    }
    if (newAmountUsed > this.props.totalPrice) {
      throw new ItemDomainException(
        'Amount used must be less than or equal to total price',
      );
    }
    this.props.amountUsed = newAmountUsed;
    this.toTouch();
  }
  get id() {
    return this.props.id!;
  }
  get name() {
    return this.props.name;
  }
  get description() {
    return this.props.description || null;
  }
  get unitPrice() {
    return this.props.unitPrice || null;
  }
  get totalPrice() {
    return this.props.totalPrice!;
  }
  get amountUsed() {
    return this.props.amountUsed;
  }
  get quantityUsed() {
    return this.props.quantityUsed || null;
  }
  get quantityTotal() {
    return this.props.quantityTotal || null;
  }
  get type() {
    return this.props.type;
  }
  get createdAt() {
    return this.props.createdAt!;
  }
  get updatedAt() {
    return this.props.updatedAt!;
  }
  get contractUuid() {
    return this.props.contractUuid;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      unitPrice: this.unitPrice,
      totalPrice: this.totalPrice,
      amountUsed: this.amountUsed,
      quantityUsed: this.quantityUsed,
      quantityTotal: this.quantityTotal,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  private toTouch() {
    this.props.updatedAt = new Date();
  }
}
