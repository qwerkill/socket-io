import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}


  async findOneName(name: string): Promise<RoomEntity> {
    return await this.roomRepository.findOne({ where: { name } });
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    const newRoom = this.roomRepository.create(createRoomDto);
    await this.roomRepository.save(newRoom);
    return newRoom;
  }
}
