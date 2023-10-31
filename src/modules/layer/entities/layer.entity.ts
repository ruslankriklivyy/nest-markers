import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MainEntity } from '@/modules/database/entities/main.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Marker } from '@/modules/marker/entities/marker.entity';
import { CustomField } from '@/modules/custom-field/entities/custom-field.entity';
import { LAYER_TYPE_PUBLIC } from '@/consts/LAYER_TYPE_PUBLIC';

export type LayerType = 'public' | 'private';

@Entity({ name: 'layers' })
export class Layer extends MainEntity {
  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Column({ type: 'enum', enum: LAYER_TYPE_PUBLIC })
  type: LayerType;

  @OneToMany(() => Marker, (marker) => marker.layer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'markers' })
  markers: Marker[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => CustomField, (customField) => customField.layer)
  @JoinColumn({ name: 'custom_fields' })
  custom_fields: CustomField[];
}
