import { TimestampEntites } from "src/Generic/timestamp.entites";
import { RoomEntity } from "src/room/entities/room.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity('message')
export class MessageEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => UserEntity, user => user.id)
    user: UserEntity;

    @ManyToOne(()=> RoomEntity, room => room.id)
    room: RoomEntity;
} 