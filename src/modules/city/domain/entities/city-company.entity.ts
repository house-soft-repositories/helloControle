interface CityCompanyEntityProps {
  id?: number;
  nome: string;
  nomeFantasia?: string;
  cnpj: string;
  email: string;
  contato: string;
  uf: string;
  cidade: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cityId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class CityCompanyEntity {
  constructor(private props: CityCompanyEntityProps) {
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

  get nomeFantasia() {
    return this.props.nomeFantasia;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get email() {
    return this.props.email;
  }

  get contato() {
    return this.props.contato;
  }

  get uf() {
    return this.props.uf;
  }

  get cidade() {
    return this.props.cidade;
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
      nomeFantasia: this.nomeFantasia,
      cnpj: this.cnpj,
      email: this.email,
      contato: this.contato,
      uf: this.uf,
      cidade: this.cidade,
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
