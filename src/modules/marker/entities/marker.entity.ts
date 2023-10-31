import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { MainEntity } from '@/modules/database/entities/main.entity';
import { PolymorphicChildren } from 'typeorm-polymorphic';
import { File } from '@/modules/file/entities/file.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Layer } from '@/modules/layer/entities/layer.entity';

@Entity({ name: 'markers' })
export class Marker extends MainEntity {
  @Column({ type: 'varchar', length: 10 })
  color: string;

  @Column({ type: 'varchar', length: 80 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @PolymorphicChildren(() => File, { eager: false })
  images: File[];

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @ManyToOne(() => Layer, (layer) => layer.id)
  @JoinColumn({ name: 'layer_id' })
  layer: Layer;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
