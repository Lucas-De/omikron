import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 400 })
  description: string;

  @Column({ type: 'date', nullable: false })
  date: string;

  @Column({ type: 'int', nullable: true })
  calories: number;

  @Column({ type: 'int', nullable: true })
  proteins: number;

  @Column({ type: 'int', nullable: true })
  carbs: number;

  @Column({ type: 'int', nullable: true })
  fats: number;

  @ManyToOne(() => User, (user) => user.meals, { onDelete: 'CASCADE' })
  user: User;
}
