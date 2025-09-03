import { BaseModel } from '@/core/models/base_model';
import CityModel from '@/modules/city/infra/models/city.model';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
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

  @Column({ name: 'valor_total', type: 'decimal', precision: 15, scale: 2 })
  valorTotal: number;

  @Column({ name: 'valor_glosado', type: 'decimal', precision: 15, scale: 2 })
  valorGlosado: number;

  @Column({ name: 'data_assinatura', type: 'date' })
  dataAssinatura: Date;

  @Column({ name: 'data_vencimento', type: 'date' })
  dataVencimento: Date;

  @Column({ name: 'secretaria_contratante', type: 'varchar' })
  secretariaContratante: string;

  @Column({ name: 'empresa_contratada', type: 'varchar' })
  empresaContratada: string;

  @ManyToOne(() => CityModel, { nullable: true })
  @JoinColumn({ name: 'cidade_contratante_id' })
  cidadeContratante: CityModel | null;

  @Column({ name: 'cidade_contratante_id', nullable: true })
  cidadeContratanteId: number | null;
}
