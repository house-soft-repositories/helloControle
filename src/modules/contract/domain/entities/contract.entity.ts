import ItemEntity from '@/modules/contract/domain/entities/item.entity';
import ContractDomainException from '@/modules/contract/exceptions/contract_domain_exception';
import { randomUUID } from 'crypto';

interface ContractEntityProps {
  uuid?: string;
  id: string;
  nome?: string | null;
  descricao?: string | null;
  valorTotal: number;
  valorGlosado: number;
  dataAssinatura: Date;
  dataVencimento: Date;
  cityId: number | null;
  organId: number | null;
  companyId: number | null;
  fileUrl?: string | null;
  items?: ItemEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class ContractEntity {
  private constructor(private readonly props: ContractEntityProps) {
    this.props = {
      uuid: props.uuid ?? randomUUID().toString(),
      id: props.id,
      fileUrl: props.fileUrl || null,
      nome: props.nome || null,
      descricao: props.descricao || null,
      valorTotal: props.valorTotal,
      valorGlosado: props.valorGlosado,
      dataAssinatura: props.dataAssinatura,
      dataVencimento: props.dataVencimento,
      cityId: props.cityId,
      organId: props.organId,
      companyId: props.companyId,
      items: props.items ?? [],
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  private static validate(props: Partial<ContractEntityProps>) {
    if (!props.id) {
      throw new ContractDomainException('Contract ID is required');
    }
    if (props.valorTotal !== undefined && props.valorTotal < 0) {
      throw new ContractDomainException(
        'Total value must be greater than or equal to 0',
      );
    }
    if (props.valorGlosado !== undefined && props.valorGlosado < 0) {
      throw new ContractDomainException(
        'Discounted value must be greater than or equal to 0',
      );
    }
    if (!props.dataAssinatura) {
      throw new ContractDomainException('Signature date is required');
    }
    if (!props.dataVencimento) {
      throw new ContractDomainException('Expiration date is required');
    }
    if (!props.organId) {
      throw new ContractDomainException('Contracting organ is required');
    }
    if (!props.companyId) {
      throw new ContractDomainException('Contracted company is required');
    }
    if (!props.cityId) {
      throw new ContractDomainException('City is required');
    }
    if (
      props.dataAssinatura &&
      props.dataVencimento &&
      props.dataAssinatura > props.dataVencimento
    ) {
      throw new ContractDomainException(
        'Signature date cannot be after expiration date',
      );
    }
  }

  static create(props: ContractEntityProps) {
    this.validate(props);
    return new ContractEntity(props);
  }

  static fromData(props: ContractEntityProps) {
    return new ContractEntity(props);
  }

  get uuid() {
    return this.props.uuid!;
  }

  get id() {
    return this.props.id;
  }

  get nome() {
    return this.props.nome;
  }

  get descricao() {
    return this.props.descricao;
  }

  get valorTotal() {
    return this.props.valorTotal;
  }

  get valorGlosado() {
    return this.props.valorGlosado;
  }

  get dataAssinatura() {
    return this.props.dataAssinatura;
  }

  get dataVencimento() {
    return this.props.dataVencimento;
  }
  get cityId() {
    return this.props.cityId;
  }
  get organId() {
    return this.props.organId;
  }

  get companyId() {
    return this.props.companyId;
  }

  get items() {
    return this.props.items!;
  }

  get createdAt() {
    return this.props.createdAt!;
  }

  get updatedAt() {
    return this.props.updatedAt!;
  }

  get fileUrl() {
    return this.props.fileUrl || null;
  }

  setContractFileUrl(fileUrl: string) {
    this.props.fileUrl = fileUrl;
    this.toTouch();
  }

  toObject() {
    return {
      uuid: this.props.uuid,
      id: this.props.id,
      nome: this.props.nome,
      descricao: this.props.descricao,
      valorTotal: this.props.valorTotal,
      valorGlosado: this.props.valorGlosado,
      dataAssinatura: this.props.dataAssinatura,
      dataVencimento: this.props.dataVencimento,
      organId: this.organId,
      companyId: this.companyId,
      fileUrl: this.fileUrl,
      items: this.props.items?.map(item => item.toObject()),
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  checkItemsTotalAgainstContractValue() {
    const items = this.props.items;
    if (!items || items.length === 0) {
      return;
    }
    const sumTotalPriceItems = items.reduce(
      (sum, current) => sum + current.totalPrice,
      0,
    );

    if (sumTotalPriceItems < this.props.valorTotal) {
      throw new ContractDomainException(
        'Sum of item total prices is less than contract total value',
      );
    }
  }

  addItem(item: ItemEntity) {
    const items = this.props.items;
    let sumTotalPriceItems = 0;
    if (items) {
      sumTotalPriceItems = items.reduce(
        (sum, current) => sum + current.totalPrice,
        0,
      );
    }

    if (sumTotalPriceItems + item.totalPrice > this.props.valorTotal) {
      throw new ContractDomainException(
        'Total price of items exceeds contract total value',
      );
    }

    this.props.items!.push(item);
    this.toTouch();
  }

  private toTouch() {
    this.props.updatedAt = new Date();
  }
}
