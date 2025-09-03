interface CityEntityProps {
  id?: number;
  name: string;
  state: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export default class CityEntity {
  constructor(private props: CityEntityProps) {
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

  get name() {
    return this.props.name;
  }

  get state() {
    return this.props.state;
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
      name: this.name,
      state: this.state,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
