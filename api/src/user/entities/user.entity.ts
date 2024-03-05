import { ROLE_ENUM } from "src/types/user/user";
import { TimestampEntites } from "../../Generic/timestamp.entites";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "src/message/entities/message.entity";

@Entity('user')
export class UserEntity extends TimestampEntites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: ROLE_ENUM,
    })
    role: ROLE_ENUM;

    @OneToMany(() => MessageEntity, message => message.user)
    messages: MessageEntity[];
    
}
