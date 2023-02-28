import { Person } from 'src/person/entity/person.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import Church from 'src/church/entity/church.entity';

@Entity()
export class Departament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Person)
  @JoinColumn()
  leader: Person;

  @Column()
  description?: string;

  @ManyToMany(() => Person)
  @JoinTable()
  members: Person[];

  @OneToOne(() => Church, { nullable: false })
  @JoinColumn()
  church: Church;
}
