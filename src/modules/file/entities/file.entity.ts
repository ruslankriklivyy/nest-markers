import { Column, Entity } from 'typeorm';

import { MainEntity } from '@/modules/database/entities/main.entity';
import { FILE_ENTITY_TYPES } from '@/consts/FILE_ENTITY_TYPES';

@Entity({ name: 'files' })
export class File extends MainEntity {
  @Column({ type: 'varchar', length: 80 })
  filename: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  size: number;

  @Column({ name: 'entity_id', nullable: true })
  entity_id: number | null;

  @Column({
    name: 'entity_type',
    enum: FILE_ENTITY_TYPES,
    default: null,
    nullable: true,
  })
  entity_type: FILE_ENTITY_TYPES | null;
}
