import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectDto } from '../dto/project.dto';
import { User } from '../../auth/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import {Transaction} from '../../transactions/entities/transaction.entity';

@Entity()
export class Project implements ProjectDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar' })
  projectName: string;

  @Column({ type: 'timestamptz', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  endDate?: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => Client, (client) => client.projects)
  client: Client;

  @Column({ type: 'uuid', nullable: false })
  clientId: string;

  @OneToMany(() => Transaction, (transaction) => transaction.project, {
    cascade: true,
  })
  transactions: Transaction[];
}
