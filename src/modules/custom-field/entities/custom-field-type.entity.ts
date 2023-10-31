import { Column, Entity } from 'typeorm';

import { MainEntity } from '@/modules/database/entities/main.entity';

@Entity({ name: 'custom_field_types' })
export class CustomFieldType extends MainEntity {
  @Column({ type: 'varchar', length: 80 })
  name: string;
}
