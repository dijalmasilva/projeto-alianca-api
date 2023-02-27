import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { PersonCreateDto } from 'src/person/dto/person-create.dto';
import { Roles } from 'src/roles.decorator';
import { ROLE } from 'src/constants/role.constants';
import { PersonUpdateDto } from 'src/person/dto/person-update.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @Roles(ROLE.PASTOR, ROLE.ADMIN, ROLE.LEADER)
  async findAll() {
    return this.personService.findAll();
  }

  @Post(ROLE.ADMIN)
  async create(@Body() person: PersonCreateDto) {
    return this.personService.create(person);
  }

  @Patch(':id')
  async updatePerson(@Body() person: PersonUpdateDto, @Param('id') id: string) {
    return this.personService.update(id, person);
  }

  @Get(':id')
  @Roles(ROLE.ADMIN, ROLE.PASTOR, ROLE.LEADER)
  async findOne(@Param('id') id: string) {
    try {
      return this.personService.findOne(id);
    } catch (e) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
