import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { Equal, Repository } from 'typeorm';
import { Auth } from 'src/auth/entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person } from 'src/person/entity/person.entity';
import { ROLE } from 'src/constants/role.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly personService: PersonService,
    private jwtService: JwtService,
  ) {}

  private generateCode(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async validateUser(username: string, pass: number): Promise<any> {
    try {
      const found = await this.authRepository.findOneByOrFail({
        code: Equal(pass),
        phoneNumber: Equal(username),
      });
      console.log(`validating user`);
      console.dir(found);
      const user = await this.personService.findByNumber(found.phoneNumber);
      console.log(`user exist?`);
      console.dir(user);
      if (!user) {
        console.log('creating new');
        return this.personService.create({
          name: '',
          roles: [ROLE.VISITOR],
          phoneNumber: found.phoneNumber,
          birthday: '',
          hasAlliance: false,
          picture: '',
        });
      }

      return user;
    } catch (e) {
      return null;
    }
  }

  async requestCode(number: string): Promise<number> {
    console.log(`REQUEST CODE WITH NUMBER: ${number}`);
    const found = await this.authRepository.findOneBy({
      phoneNumber: Equal(number),
    });
    if (found) {
      return found.code;
    }

    const register = await this.authRepository.save({
      code: this.generateCode(),
      phoneNumber: number,
      expireIn: '',
    });
    return register.code;
  }

  async login(person: Person) {
    const payload = {
      username: person.phoneNumber,
      sub: person.id,
      roles: person.roles,
      name: person.name,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      isNewUser: !Boolean(person.name),
    };
  }

  async signOut(number: string): Promise<void> {
    await this.authRepository.delete({ phoneNumber: number });
  }

  async getProfile(id: string): Promise<Person | null> {
    return await this.personService.findOne(id);
  }
}
