import { ROLE } from 'src/constants/role.constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthday: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  picture?: string;

  @Column({ default: false })
  hasAlliance?: boolean;

  @Column('enum', { enum: ROLE, default: [], array: true })
  roles?: ROLE[];
}
