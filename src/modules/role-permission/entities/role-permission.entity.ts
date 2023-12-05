import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';
import { PermissionType } from '@/modules/permission/enums/permission-type.enum';

@Entity({ name: 'role_permissions' })
export class RolePermission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionType,
    enumName: 'type',
    default: PermissionType.Viewed,
  })
  type: PermissionType;

  @Column({ type: 'integer' })
  permission_id: number;

  @Column({ type: 'integer' })
  role_id: number;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: Role;

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
