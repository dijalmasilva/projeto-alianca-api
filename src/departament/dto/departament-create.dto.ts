import { Person } from 'src/person/entity/person.entity';
import Church from 'src/church/entity/church.entity';

export type DepartamentCreateDto = {
  name: string;
  leader: Person;
  description?: string;
  members: Person[];
  church: Church;
};
