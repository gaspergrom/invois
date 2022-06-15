import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {TransactionDto, TransactionType} from '../dto/transaction.dto';
import { User } from '../../auth/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import {Project} from '../../projects/entities/project.entity';

@Entity()
export class Transaction implements TransactionDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({
    type: 'float'
  })
  amount: number;

  @Column({
    type: 'varchar'
  })
  currency: string;

  @Column({
    type: 'timestamptz'
  })
  date: Date;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => Project, (project) => project.transactions)
  project: Project;

  @Column({ type: 'uuid', nullable: false })
  projectId: string;

  @ManyToOne(() => Client, (client) => client.projects)
  client: Client;

  @Column({ type: 'uuid', nullable: false })
  clientId: string;
}
