import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { EventCreateDto } from 'src/event/dto/event-create.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Post()
  async create(@Body() event: EventCreateDto) {
    return this.eventService.create(event);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
}
