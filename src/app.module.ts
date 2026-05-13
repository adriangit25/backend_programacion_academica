import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LoginModule } from './login/login.module';
import { ProgramacionAcademicaModule } from './programacion-academica/programacion-academica.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LoginModule,
    ProgramacionAcademicaModule,
  ],
})
export class AppModule {}