import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from '@/modules/notification/entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = await this.notificationRepository.save(
      createNotificationDto,
    );
    return this.notificationRepository.findOne({
      where: {
        id: newNotification.id,
        notifiable_entity: newNotification.notifiable_entity,
        notification_type: newNotification.notification_type,
      },
      relations: ['marker'],
    });
  }

  readNotification(id: number) {
    return this.notificationRepository.update({ id }, { is_viewed: true });
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }
}
