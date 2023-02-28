import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChurchService } from './church.service';
import { Public } from 'src/auth/jwt.decorator';
import { Roles } from 'src/roles.decorator';
import { ROLE } from 'src/constants/role.constants';
import { ChurchCreateDto } from 'src/church/dto/church-create.dto';

@Controller('church')
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Get()
  @Public()
  async findAll() {
    return this.churchService.findAll();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.churchService.findOne(id);
  }

  @Post()
  @Roles(ROLE.ADMIN)
  async create(@Body() church: ChurchCreateDto) {
    return this.churchService.create(church);
  }
}
