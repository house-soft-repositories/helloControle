import { FormatterString } from '@/core/formmaters/formatter.string';
import { BaseModelIdNumericGenerated } from '@/core/models/base_model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import CityModel from './city.model';

@Entity('city_company')
export default class CityCompanyModel extends BaseModelIdNumericGenerated {
  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  nome: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: {
      to: (value: string) => value?.toLowerCase(),
      from: (value: string) =>
        value ? FormatterString.capitalizeFirst(value) : null,
    },
  })
  nomeFantasia: string;

  @Column({
    type: 'varchar',
    length: 18,
    unique: true,
  })
  cnpj: string;

  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value,
    },
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  contato: string;

  @Column({
    type: 'varchar',
    length: 2,
    transformer: {
      to: (value: string) => value.toUpperCase(),
      from: (value: string) => value,
    },
  })
  uf: string;

  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  cidade: string;

  @Column({
    type: 'varchar',
    length: 9,
  })
  cep: string;

  @Column({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  logradouro: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  numero: string;

  @Column({
    type: 'varchar',
    length: 100,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => FormatterString.capitalizeFirst(value),
    },
  })
  bairro: string;

  @Column({ type: 'int' })
  cityId: number;

  @ManyToOne(() => CityModel)
  @JoinColumn({ name: 'cityId' })
  city: CityModel;
}
