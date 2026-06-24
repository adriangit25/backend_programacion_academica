import { Module } from '@nestjs/common';
import { ProgramacionAcademicaController } from './programacion-academica.controller';
import { ProgramacionAcademicaService } from './programacion-academica.service';
import { BackupModule } from '../backup/backup.module';
@Module({
  controllers: [ProgramacionAcademicaController],
  providers: [ProgramacionAcademicaService],
  imports: [BackupModule]
})
export class ProgramacionAcademicaModule {}
