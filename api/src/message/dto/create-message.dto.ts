import { RoomEntity } from 'src/room/entities/room.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateMessageDto {
    message: string;


    user: UserEntity;

    roomId: RoomEntity;
}