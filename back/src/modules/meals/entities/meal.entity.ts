import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum MealStatus {
  Pending = 'PENDING',
  Processed = 'PROCESSED',
  Error = 'ERROR',
}

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 400, nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: false })
  date: string;

  @Column({ type: 'int', nullable: true })
  calories: number;

  @Column({ type: 'int', nullable: true })
  proteins: number;

  @Column({ type: 'int', nullable: true })
  carbs: number;

  @Column({ type: 'int', nullable: true })
  fats: number;

  @Column({ type: 'enum', enum: MealStatus, default: MealStatus.Pending })
  status: MealStatus;

  @ManyToOne(() => User, (user) => user.meals, { onDelete: 'CASCADE' })
  user: User;
}
