import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@/modules/user/entities/user.entity';
import { Marker } from '@/modules/marker/entities/marker.entity';

@Entity({ name: 'files' })
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  filename: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  size: number;

  @Column({ nullable: true, select: false })
  user_id: number;

  @Column({ nullable: true, select: false })
  marker_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Marker, (marker) => marker.id)
  @JoinColumn({ name: 'marker_id' })
  marker: Marker;

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
