import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientContactDto, ClientDto } from '../dto/client.dto';
import { User } from '../../auth/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class Client implements ClientDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  address2?: string;

  @Column({ type: 'varchar', nullable: true })
  addressCity?: string;

  @Column({ type: 'varchar', nullable: true })
  country?: string;

  @Column({ type: 'varchar', nullable: true })
  addressPostCode?: string;

  @Column({ type: 'varchar', nullable: true })
  addressState?: string;

  @Column({ type: 'varchar', nullable: true })
  taxIdLabel?: string;

  @Column({ type: 'varchar', nullable: true })
  taxIdNumber?: string;

  @Column({ type: 'json' })
  contacts: ClientContactDto[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.clients)
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @OneToMany(() => Project, (project) => project.client, {
    cascade: true,
  })
  projects: Project[];
}
