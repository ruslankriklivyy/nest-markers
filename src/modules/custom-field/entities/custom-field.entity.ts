import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Layer } from '@/modules/layer/entities/layer.entity';
import { CustomFieldType } from '@/modules/custom-field-type/entities/custom-field-type.entity';

@Entity({ name: 'custom_fields' })
export class CustomField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_important: boolean;

  @Column({ select: false })
  custom_field_type_id: number;

  @Column({ select: false })
  layer_id: number;

  @ManyToOne(() => CustomFieldType, (customFieldType) => customFieldType.id)
  @JoinColumn({ name: 'custom_field_type_id' })
  custom_field_type: CustomFieldType;

  @ManyToOne(() => Layer, (layer) => layer.id)
  @JoinColumn({ name: 'layer_id' })
  layer: Layer;

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
