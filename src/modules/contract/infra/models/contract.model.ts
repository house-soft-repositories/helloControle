import { BaseModel } from '@/core/models/base_model';
import { CityCompanyModel, CityOrganModel } from '@/modules/city/infra/models';
import CityModel from '@/modules/city/infra/models/city.model';
import ItemModel from '@/modules/contract/infra/models/item.model';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'contracts' })
export default class ContractModel extends BaseModel {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true, type: 'varchar' })
  id: string;

  @Column({ type: 'varchar', nullable: true })
  nome: string | null;

  @Column({ type: 'text', nullable: true })
  descricao: string | null;

  @Column({
    name: 'valor_total',
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => parseFloat(value),
    },
  })
  valorTotal: number;

  @Column({
    name: 'valor_glosado',
    type: 'decimal',
    precision: 15,
    scale: 2,
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => parseFloat(value),
    },
  })
  valorGlosado: number;

  @Column({ name: 'data_assinatura', type: 'date' })
  dataAssinatura: Date;

  @Column({ name: 'data_vencimento', type: 'date' })
  dataVencimento: Date;

  @ManyToOne(() => CityOrganModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'organ_id' })
  organ: CityOrganModel | null;

  @Column({ name: 'organ_id', nullable: true })
  organId: number | null;

  @ManyToOne(() => CityCompanyModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'company_id' })
  company: CityCompanyModel | null;

  @Column({ name: 'company_id', nullable: true })
  companyId: number | null;

  @ManyToOne(() => CityModel, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'city_id' })
  city: CityModel | null;

  @Column({ name: 'city_id', nullable: true })
  cityId: number | null;

  @Column({ name: 'file_url', type: 'varchar', nullable: true })
  fileUrl: string | null;

  @OneToMany(() => ItemModel, item => item.contract, {
    cascade: true,
    eager: true,
  })
  items: ItemModel[];
}
