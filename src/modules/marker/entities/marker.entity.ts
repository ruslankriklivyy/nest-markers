import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';

import { File } from '@/modules/file/entities/file.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Layer } from '@/modules/layer/entities/layer.entity';

@Entity({ name: 'markers' })
export class Marker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  color: string;

  @Column({ type: 'varchar', length: 80 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @ManyToOne(() => Layer, (layer) => layer.id)
  @JoinColumn({ name: 'layer_id' })
  layer: Layer;

  @Column({ select: false })
  layer_id: number;

  @Column({ select: false, type: 'integer', array: true, default: [] })
  images_ids: number[];

  @OneToMany(() => File, (file) => file.marker, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'images_ids' })
  images: File[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ select: false })
  user_id: number;

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

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    default: null,
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;
}
