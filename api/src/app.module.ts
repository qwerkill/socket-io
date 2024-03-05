import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfigModule } from './database-config/database-config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [DatabaseConfigModule, AuthModule, UserModule, EventsModule, MessageModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
