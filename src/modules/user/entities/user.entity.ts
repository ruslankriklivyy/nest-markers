import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PolymorphicChildren } from 'typeorm-polymorphic';

import { File } from '@/modules/file/entities/file.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PolymorphicChildren(() => File, { eager: true })
  avatar?: File;

  @Column({ type: 'varchar', name: 'full_name', length: 120 })
  full_name: string;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column({ type: 'varchar', length: 80 })
  password?: string;

  @Column({ type: 'boolean', name: 'is_activated', default: false })
  is_activated: boolean;
}
