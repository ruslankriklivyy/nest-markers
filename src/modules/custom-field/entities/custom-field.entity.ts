import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { MainEntity } from '@/modules/database/entities/main.entity';
import { CustomFieldType } from '@/modules/custom-field/entities/custom-field-type.entity';
import { Layer } from '@/modules/layer/entities/layer.entity';

@Entity({ name: 'custom_fields' })
export class CustomField extends MainEntity {
  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'boolean', default: false })
  is_important: boolean;

  @ManyToOne(() => CustomFieldType, (customFieldType) => customFieldType.id)
  @JoinColumn({ name: 'custom_field_type_id' })
  custom_field_type: CustomFieldType;

  @ManyToOne(() => Layer, (layer) => layer.id)
  @JoinColumn({ name: 'layer_id' })
  layer: Layer;
}
