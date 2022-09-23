import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse, OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  identity(@MessageBody() data: any) {
    console.log(data);
  }

  handleConnection(client: Socket, ...args: any[]){
    client.emit('message', 'Hi there!');
    console.log('connect', client.id, args);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect', client.id);
  }
}
