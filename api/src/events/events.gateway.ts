import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
  } from '@nestjs/websockets';
  import { Logger, Post } from '@nestjs/common';
  import { Server, Socket } from 'socket.io';
  import { decode } from 'jsonwebtoken';
    import { UserService } from 'src/user/user.service';
import { RoomService } from 'src/room/room.service';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { CreateRoomDto } from 'src/room/dto/create-room.dto';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(
      private userService: UserService,
      private roomService: RoomService,
      private messageService: MessageService,
    ) {}
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    private connectedUsers = [];

 
  
    async handleConnection(client: Socket) {
        console.log('Client connected');
      const { token } = client.handshake.headers;
      console.log(token);
      
      if (!token) {
        return;
      }
      
      if (typeof token === 'string') {
        const decoded: any = decode(token);
        const { username } = decoded;
        console.log(username);
        const user = await this.userService.findOneByUsername(username);
        console.log(user);
        // await this.connectedUsersService.create({ socketId: client.id, user });
        this.connectedUsers.push({
          user,
          socketId: client.id,
        });
        console.log(this.connectedUsers);
        this.server.emit('users', this.connectedUsers);
      }
    }
  
    async handleDisconnect(client: Socket) {
        console.log('Client disconnected');
      const user = this.connectedUsers.find(
        (connectedUser) => connectedUser.socketId === client.id,
      );
      if (user) {
        // await this.connectedUsersService.delete(user.id);
        this.connectedUsers = this.connectedUsers.filter(
          (connectedUser) => connectedUser.socketId !== client.id,
        );
        this.server.emit('users', this.connectedUsers);
      }
      
    }

  
    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: { text: string, room: string }): Promise<void> {
      const message = { text: payload.text, socketId: client.id, room: payload.room };
      client.emit('newMessage', message);
      client.broadcast.emit('newMessage', message);

      const user = this.connectedUsers.find(user => user.socketId === client.id);

      const room = await this.roomService.findOneName(payload.room);

      console.log(room,'rororororor');
      
      const createMessageDto: CreateMessageDto = {
        message: payload.text,
        user: user.user,
        roomId:room,
      };

      await this.messageService.createMessage(createMessageDto);
    }

@SubscribeMessage('joinRoom')
async handleJoinRoom(client: Socket, room: string): Promise<void> {
  client.join(room);
  console.log(`User joined room ${room}`);
}
    

    @SubscribeMessage('createRoom')
    async handleCreateRoom(client: Socket, room: string): Promise<void> {
      client.join(room);
      this.server.of('/').adapter.rooms[room] = {};
      this.server.emit('newRoom', room);
      console.log(`Room ${room} created`);

      const user = this.connectedUsers.find(user => user.socketId === client.id);


      const createRoomDto: CreateRoomDto = {
        name: room,
        users: user.user,
      };
    
      await this.roomService.createRoom(createRoomDto);
    }
    
  
    afterInit(server: Server) {
      this.logger.log('Websocket server initialized');
    }
  }
  