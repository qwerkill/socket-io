import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { MessageModule } from 'src/message/message.module';
import { RoomModule } from 'src/room/room.module';
import { RoomService } from 'src/room/room.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MessageModule,
    RoomModule,
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
