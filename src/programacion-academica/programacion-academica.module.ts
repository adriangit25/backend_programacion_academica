import { Module } from '@nestjs/common';
import { ProgramacionAcademicaController } from './programacion-academica.controller';
import { ProgramacionAcademicaService } from './programacion-academica.service';

@Module({
  controllers: [ProgramacionAcademicaController],
  providers: [ProgramacionAcademicaService]
})
export class ProgramacionAcademicaModule {}
