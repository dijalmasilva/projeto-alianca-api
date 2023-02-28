import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { Person } from 'src/person/entity/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonCreateDto } from 'src/person/dto/person-create.dto';
import { PersonUpdateDto } from 'src/person/dto/person-update.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(person: PersonCreateDto): Promise<Person> {
    return this.personRepository.save(person);
  }

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: string, eagerLoad?: boolean): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { id },
      relations: {
        churchs: eagerLoad,
      },
    });
  }

  findByNumber(phoneNumber: string): Promise<Person | null> {
    return this.personRepository.findOneBy({
      phoneNumber: Equal(phoneNumber),
    });
  }

  async update(id: string, person: PersonUpdateDto): Promise<Person | null> {
    await this.personRepository.update({ id: id }, person);
    return this.personRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.personRepository.delete({ id });
  }
}
