interface CityOrganEntityProps {
  id?: number;
  nome: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cityId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class CityOrganEntity {
  constructor(private props: CityOrganEntityProps) {
    this.props = {
      ...props,
      id: props.id,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id() {
    return this.props.id!;
  }

  get nome() {
    return this.props.nome;
  }

  get cep() {
    return this.props.cep;
  }

  get logradouro() {
    return this.props.logradouro;
  }

  get numero() {
    return this.props.numero;
  }

  get bairro() {
    return this.props.bairro;
  }

  get cityId() {
    return this.props.cityId;
  }

  get createdAt() {
    return this.props.createdAt!;
  }

  get updatedAt() {
    return this.props.updatedAt!;
  }

  toObject() {
    return {
      id: this.id,
      nome: this.nome,
      cep: this.cep,
      logradouro: this.logradouro,
      numero: this.numero,
      bairro: this.bairro,
      cityId: this.cityId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
