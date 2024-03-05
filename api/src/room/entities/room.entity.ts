import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from 'typeorm';


@Entity('room')
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];

    @OneToMany(() => MessageEntity, message => message.room)
    messages: MessageEntity[];
}