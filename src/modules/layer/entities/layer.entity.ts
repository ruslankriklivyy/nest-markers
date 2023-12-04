import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '@/modules/user/entities/user.entity';
import { Marker } from '@/modules/marker/entities/marker.entity';
import { CustomField } from '@/modules/custom-field/entities/custom-field.entity';
import { LAYER_TYPE } from '@/consts/LAYER_TYPE_PUBLIC';

@Entity({ name: 'layers' })
export class Layer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'enum', enum: LAYER_TYPE, default: LAYER_TYPE.Public })
  type: LAYER_TYPE;

  @Column({
    type: 'integer',
    array: true,
    select: false,
    default: [],
  })
  marker_ids: number[];

  @Column({
    type: 'integer',
    array: true,
    select: false,
    default: [],
  })
  custom_fields_ids: number[];

  @Column({ select: false })
  author_id: number;

  @OneToMany(() => Marker, (marker) => marker.layer, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'marker_ids' })
  markers: Marker[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => CustomField, (customField) => customField.layer)
  @JoinColumn({ name: 'custom_fields_ids' })
  custom_fields: CustomField[];

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
