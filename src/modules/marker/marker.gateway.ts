import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { NotificationService } from '@/modules/notification/notification.service';
import { NOTIFICATION_TYPES } from '@/modules/notification/enums/NOTIFICATION_TYPES';
import { NOTIFIABLE_ENTITY } from '@/modules/notification/enums/NOTIFIABLE_ENTITY';

@WebSocketGateway()
export class MarkerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Handle connection event', client);
  }

  handleDisconnect(client: Socket) {
    console.log('Handle disconnection event', client);
  }

  @SubscribeMessage('create_marker')
  async listenForCreateMarker(@MessageBody() markerId: number) {
    const notification = await this.notificationService.create({
      notifiable_id: markerId,
      notifiable_entity: NOTIFIABLE_ENTITY.Marker,
      notification_type: NOTIFICATION_TYPES.CREATE_MARKER,
    });
    this.server.sockets.emit('new_marker', notification);
  }

  @SubscribeMessage('update_marker')
  async listenForUpdateMarker(@MessageBody() markerId: number) {
    const notification = await this.notificationService.create({
      notifiable_id: markerId,
      notifiable_entity: NOTIFIABLE_ENTITY.Marker,
      notification_type: NOTIFICATION_TYPES.UPDATE_MARKER,
    });
    this.server.sockets.emit('update_marker', notification);
  }

  @SubscribeMessage('delete_marker')
  async listenForDeleteMarker(@MessageBody() markerId: number) {
    const notification = await this.notificationService.create({
      notifiable_id: markerId,
      notifiable_entity: NOTIFIABLE_ENTITY.Marker,
      notification_type: NOTIFICATION_TYPES.DELETE_MARKER,
    });
    this.server.sockets.emit('delete_marker', notification);
  }
}
