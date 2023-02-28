import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Church {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  description: string;
}

export default Church;
