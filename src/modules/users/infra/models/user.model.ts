import UserRole from '@/core/types/user_role';
import CityModel from '@/modules/city/infra/models/city.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export default class UserModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'password', select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ManyToOne(() => CityModel)
  @JoinColumn({ name: 'current_city_id' })
  currentCity: CityModel | null;

  @Column({ name: 'current_city_id', nullable: true })
  currentCityId: number | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
