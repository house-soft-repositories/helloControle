import ContractDomainException from '@/modules/contract/exceptions/contract_domain_exception';

interface ContractEntityProps {
  uuid?: string;
  id: string;
  nome?: string;
  descricao?: string;
  valorTotal: number;
  valorGlosado: number;
  dataAssinatura: Date;
  dataVencimento: Date;
  secretariaContratante: string;
  empresaContratada: string;
  cidadeContratante?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class ContractEntity {
  private constructor(private readonly props: ContractEntityProps) {
    this.props = {
      uuid: props.uuid,
      id: props.id,
      nome: props.nome,
      descricao: props.descricao,
      valorTotal: props.valorTotal,
      valorGlosado: props.valorGlosado,
      dataAssinatura: props.dataAssinatura,
      dataVencimento: props.dataVencimento,
      secretariaContratante: props.secretariaContratante,
      empresaContratada: props.empresaContratada,
      cidadeContratante: props.cidadeContratante,
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
    if (!props.secretariaContratante) {
      throw new ContractDomainException('Contracting secretary is required');
    }
    if (!props.empresaContratada) {
      throw new ContractDomainException('Contracted company is required');
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
    return this.props.uuid;
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

  get secretariaContratante() {
    return this.props.secretariaContratante;
  }

  get empresaContratada() {
    return this.props.empresaContratada;
  }

  get cidadeContratante() {
    return this.props.cidadeContratante;
  }

  get createdAt() {
    return this.props.createdAt!;
  }

  get updatedAt() {
    return this.props.updatedAt!;
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
      secretariaContratante: this.props.secretariaContratante,
      empresaContratada: this.props.empresaContratada,
      cidadeContratante: this.props.cidadeContratante,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
