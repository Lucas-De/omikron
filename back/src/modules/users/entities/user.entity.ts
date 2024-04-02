import { Meal } from 'src/modules/meals/entities/meal.entity';
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

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Common })
  role: UserRole;

  @Column({ type: 'varchar', length: 64 })
  passwordHash: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];
}
