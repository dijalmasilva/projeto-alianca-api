import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DepartamentService } from 'src/departament/departament.service';
import { DepartamentCreateDto } from 'src/departament/dto/departament-create.dto';

@Controller('departament')
export class DepartamentController {
  constructor(private readonly departamentService: DepartamentService) {}

  @Get()
  async findAll() {
    return this.departamentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.departamentService.findOne(id);
  }

  @Post()
  async create(@Body() departament: DepartamentCreateDto) {
    return this.departamentService.create(departament);
  }
}
