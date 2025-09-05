interface CityOrganEntityProps {
  id?: number;
  nome: string;
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
      cityId: this.cityId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
