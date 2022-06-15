import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { Client } from '../../clients/entities/client.entity';
import { Project } from '../../projects/entities/project.entity';
import {Transaction} from '../../transactions/entities/transaction.entity';

@Entity()
export class User implements UserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    select: false,
  })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  profilePhoto?: string;

  @Column({
    nullable: true,
    select: false,
  })
  resetToken?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Client, (client) => client.user, {
    cascade: true,
  })
  clients: Client[];

  @OneToMany(() => Project, (project) => project.user, {
    cascade: true,
  })
  projects: Project[];

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    cascade: true,
  })
  transactions: Transaction[];
}
