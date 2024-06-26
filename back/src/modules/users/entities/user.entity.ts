import { Meal } from '../../meals/entities/meal.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserRole {
  Admin = 'ADMIN',
  Common = 'COMMON',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  firstName: string;

  @Column({ type: 'varchar', length: 20 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Common })
  role: UserRole;

  @Column({ type: 'varchar', length: 64, nullable: true })
  passwordHash: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];
}
