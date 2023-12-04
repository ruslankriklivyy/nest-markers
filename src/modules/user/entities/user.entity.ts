import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { File } from '@/modules/file/entities/file.entity';
import { Marker } from '@/modules/marker/entities/marker.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'full_name', length: 120 })
  full_name: string;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 80, select: false })
  password: string;

  @Column({ type: 'boolean', name: 'is_activated', default: false })
  is_activated: boolean;

  @Column({ select: false, nullable: true })
  avatar_id: number;

  @Column({ type: 'integer', array: true, select: false, default: [] })
  marker_ids: number[];

  @OneToOne(() => File)
  @JoinColumn({ name: 'avatar_id' })
  avatar: File;

  @OneToMany(() => Marker, (marker) => marker.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'marker_ids' })
  markers: Marker[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
