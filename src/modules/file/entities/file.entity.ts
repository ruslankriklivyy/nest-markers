import { Column } from 'typeorm';
import { PolymorphicParent } from 'typeorm-polymorphic';

import { MainEntity } from '@/modules/database/entities/main.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Marker } from '@/modules/marker/entities/marker.entity';

export class File extends MainEntity {
  @Column({ type: 'varchar', length: 80 })
  filename: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'float' })
  size: number;

  @PolymorphicParent(() => [User, Marker])
  owner: User | Marker;

  @Column({ name: 'entity_id' })
  entity_id: number;

  @Column({ name: 'entity_type' })
  entity_type: string;
}
