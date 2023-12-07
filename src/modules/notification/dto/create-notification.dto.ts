import { NOTIFICATION_TYPES } from '@/modules/notification/enums/NOTIFICATION_TYPES';
import { NOTIFIABLE_ENTITY } from '@/modules/notification/enums/NOTIFIABLE_ENTITY';

export class CreateNotificationDto {
  is_viewed?: boolean;
  notification_type: NOTIFICATION_TYPES;
  notifiable_id: number;
  notifiable_entity: NOTIFIABLE_ENTITY;
}
