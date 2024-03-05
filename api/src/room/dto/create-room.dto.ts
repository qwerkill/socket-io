import { UserEntity } from "src/user/entities/user.entity";

export class CreateRoomDto {
    name: string;
    users: UserEntity[];
}
