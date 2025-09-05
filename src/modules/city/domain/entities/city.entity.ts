interface CityEntityProps {
  id?: number;
  name: string;
  state: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  companies?: CityCompanyEntity[];
  organs?: CityOrganEntity[];
}

import CityCompanyEntity from './city-company.entity';
import CityOrganEntity from './city-organ.entity';

export default class CityEntity {
  constructor(private props: CityEntityProps) {
    this.props = {
      ...props,
      id: props.id,
      isActive: props.isActive ?? false,
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

  get isActive() {
    return this.props.isActive!;
  }

  get createdAt() {
    return this.props.createdAt!;
  }

  get updatedAt() {
    return this.props.updatedAt!;
  }

  get companies() {
    return this.props.companies || [];
  }

  get organs() {
    return this.props.organs || [];
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      state: this.state,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      companies: this.companies.map(c => c.toObject()),
      organs: this.organs.map(o => o.toObject()),
    };
  }
}
