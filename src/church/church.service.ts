import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Church from 'src/church/entity/church.entity';
import { Repository } from 'typeorm';
import { ChurchCreateDto } from 'src/church/dto/church-create.dto';

@Injectable()
export class ChurchService {
  constructor(
    @InjectRepository(Church)
    private readonly churchRepository: Repository<Church>,
  ) {}

  create(church: ChurchCreateDto): Promise<Church> {
    return this.churchRepository.save(church);
  }

  findOne(id: string): Promise<Church | null> {
    return this.churchRepository.findOneBy({ id });
  }

  findAll(): Promise<Church[]> {
    return this.churchRepository.find();
  }
}
