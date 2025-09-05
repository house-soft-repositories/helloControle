import { FormatterString } from '@/core/formmaters/formatter.string';
import { BaseModelIdNumericGenerated } from '@/core/models/base_model';
import { Column, Entity, OneToMany } from 'typeorm';
import CityCompanyModel from './city-company.model';
import CityOrganModel from './city-organ.model';

@Entity('city')
export default class CityModel extends BaseModelIdNumericGenerated {
  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 2,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  state: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @OneToMany(() => CityCompanyModel, company => company.city)
  companies: CityCompanyModel[];

  @OneToMany(() => CityOrganModel, organ => organ.city)
  organs: CityOrganModel[];
}
