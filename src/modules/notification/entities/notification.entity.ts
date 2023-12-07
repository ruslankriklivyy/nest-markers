import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { NOTIFICATION_TYPES } from '@/modules/notification/enums/NOTIFICATION_TYPES';
import { NOTIFIABLE_ENTITY } from '@/modules/notification/enums/NOTIFIABLE_ENTITY';
import { Marker } from '@/modules/marker/entities/marker.entity';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  is_viewed: boolean;

  @Column({
    type: 'enum',
    enum: NOTIFICATION_TYPES,
    enumName: 'notification_type',
  })
  notification_type: NOTIFICATION_TYPES;

  @Column({ nullable: true, default: null })
  notifiable_id: number;

  @ManyToOne(() => Marker, (marker) => marker.id)
  @JoinColumn({ name: 'notifiable_id' })
  marker: Marker;

  @Column({
    type: 'enum',
    enum: NOTIFIABLE_ENTITY,
    enumName: 'notifiable_entity',
    nullable: true,
    default: null,
  })
  notifiable_entity: NOTIFIABLE_ENTITY;

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
