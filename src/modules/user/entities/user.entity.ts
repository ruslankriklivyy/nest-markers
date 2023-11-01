import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { File } from '@/modules/file/entities/file.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => File, (file) => file.entity_id)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @Column({ type: 'varchar', name: 'full_name', length: 120 })
  full_name: string;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 80 })
  password: string;

  @Column({ type: 'boolean', name: 'is_activated', default: false })
  is_activated: boolean;
}
