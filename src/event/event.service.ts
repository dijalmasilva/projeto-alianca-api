import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { EventCreateDto } from 'src/event/dto/event-create.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(event: EventCreateDto): Promise<Event> {
    if (!event.church) {
      throw new HttpException(
        'É necessário informar a igreja.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.eventRepository.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: string): Promise<Event | null> {
    return this.eventRepository.findOneBy({ id });
  }
}
