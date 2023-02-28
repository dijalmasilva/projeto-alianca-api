import { Injectable } from '@nestjs/common';
import { PersonService } from 'src/person/person.service';
import { Equal, Repository } from 'typeorm';
import { Auth } from 'src/auth/entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person } from 'src/person/entity/person.entity';
import { ROLE } from 'src/constants/role.constants';

const MAIN_NUMBER = '+5583998058971';

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
      const user = await this.personService.findByNumber(found.phoneNumber);
      if (!user) {
        const roles = [ROLE.VISITOR];
        if (username === MAIN_NUMBER) {
          roles.push(ROLE.ADMIN);
          roles.push(ROLE.PASTOR);
          roles.push(ROLE.LEVITE);
          roles.push(ROLE.LEADER);
          roles.push(ROLE.SHEEP);
        }
        return this.personService.create({
          name: '',
          roles,
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
    return await this.personService.findOne(id, true);
  }
}
