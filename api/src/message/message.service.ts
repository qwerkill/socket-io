import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const newMessage = this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(newMessage);
    return newMessage;
  }

  async findMessagesByRoomName(roomName: string): Promise<MessageEntity[]> {
    return this.messageRepository.find({ where: { room: { name: roomName } } });
  }

  async findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }
}