import { Module } from '@nestjs/common';
import { PersonService } from './person/person.service';
import { PersonController } from './person/person.controller';
import { RoleController } from './role/role.controller';
import { DepartamentController } from './departament/departament.controller';
import { DepartamentService } from './departament/departament.service';
import { EventService } from './event/event.service';
import { EventController } from './event/event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/person/entity/person.entity';
import { Departament } from 'src/departament/entity/departament.entity';
import { Event } from 'src/event/entity/event.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Auth } from 'src/auth/entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from 'src/constants/jwt.constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AppController } from 'src/app.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/roles.guard';
import { ChurchController } from './church/church.controller';
import { ChurchService } from './church/church.service';
import Church from 'src/church/entity/church.entity';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from 'src/config/winston.config';
import { LoggerInterceptor } from 'src/interceptors/logger.interceptor';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '31d' },
    }),
    TypeOrmModule.forFeature([Person, Departament, Event, Auth, Church]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'projeto-alianca',
      entities: [Person, Departament, Event, Auth, Church],
      synchronize: true,
    }),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [
    PersonController,
    RoleController,
    DepartamentController,
    EventController,
    AuthController,
    AppController,
    ChurchController,
  ],
  providers: [
    PersonService,
    DepartamentService,
    EventService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    ChurchService,
  ],
})
export class AppModule {}
