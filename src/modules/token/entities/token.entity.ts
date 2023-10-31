import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import { MainEntity } from '@/modules/database/entities/main.entity';
import { User } from '@/modules/user/entities/user.entity';

@Entity({ name: 'tokens' })
export class Token extends MainEntity {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', name: 'refresh_token' })
  refresh_token: string;
}
