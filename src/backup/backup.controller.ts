import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BackupService } from './backup.service';

@ApiTags('Backup')
@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post('generar')
  @ApiOperation({ summary: 'Genera un backup manual de la base de datos' })
  async generarManual() {
    const archivo = await this.backupService.generarBackup('manual');
    if (archivo) {
      return { message: 'Backup generado exitosamente', archivo };
    }
    return { message: 'Error al generar backup', archivo: null };
  }

  @Get('listar')
  @ApiOperation({ summary: 'Lista todos los backups disponibles' })
  listar() {
    return this.backupService.listarBackups();
  }
}