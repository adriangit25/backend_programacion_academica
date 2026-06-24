import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";
import { LoggerService } from "../logger/logger.service";

const execAsync = promisify(exec);

@Injectable()
export class BackupService {
  private readonly backupsDir = "/app/backups";

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  async backupPorAccionCritica(motivo: string): Promise<void> {
    await this.generarBackup(`accion_${motivo}`);
  }

  async generarBackup(tipo: string): Promise<string | null> {
    try {
      if (!fs.existsSync(this.backupsDir)) {
        fs.mkdirSync(this.backupsDir, { recursive: true });
      }

      const ahora = new Date();
      const fecha = ahora.toISOString().slice(0, 10);
      const hora = ahora.toTimeString().slice(0, 8).replace(/:/g, "-");
      const nombreArchivo = `PUCESI_${tipo}_${fecha}_${hora}.sql`;
      const rutaArchivo = path.join(this.backupsDir, nombreArchivo);

      const host = this.configService.get<string>("DB_HOST") || "db";
      const port = this.configService.get<string>("DB_PORT") || "5432";
      const user = this.configService.get<string>("DB_USERNAME");
      const password = this.configService.get<string>("DB_PASSWORD");
      const dbName = this.configService.get<string>("DB_NAME");

      const comando = `PGPASSWORD="${password}" pg_dump -h ${host} -p ${port} -U ${user} -d ${dbName} -F p --no-owner --no-acl -f "${rutaArchivo}"`;

      await execAsync(comando);

      const stats = fs.statSync(rutaArchivo);
      const tamanoKb = (stats.size / 1024).toFixed(2);

      this.logger.info(
        `BACKUP generado: ${nombreArchivo} | Tipo: ${tipo} | Tamaño: ${tamanoKb} KB`,
      );

      // Mantener solo los últimos 20 backups
      await this.limpiarBackupsAntiguos(20);

      return nombreArchivo;
    } catch (error) {
      this.logger.error(
        `ERROR al generar backup tipo ${tipo}: ${error}`,
      );
      return null;
    }
  }

  private async limpiarBackupsAntiguos(maxArchivos: number) {
    try {
      const archivos = fs
        .readdirSync(this.backupsDir)
        .filter((f) => f.endsWith(".sql"))
        .map((f) => ({
          nombre: f,
          mtime: fs.statSync(path.join(this.backupsDir, f)).mtime,
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

      if (archivos.length > maxArchivos) {
        const aEliminar = archivos.slice(maxArchivos);
        for (const archivo of aEliminar) {
          fs.unlinkSync(path.join(this.backupsDir, archivo.nombre));
          this.logger.info(`Backup antiguo eliminado: ${archivo.nombre}`);
        }
      }
    } catch (error) {
      this.logger.error(`Error limpiando backups: ${error}`);
    }
  }

  listarBackups(): { nombre: string; fecha: string; tamanoKb: string }[] {
    try {
      if (!fs.existsSync(this.backupsDir)) return [];
      return fs
        .readdirSync(this.backupsDir)
        .filter((f) => f.endsWith(".sql"))
        .map((f) => {
          const stats = fs.statSync(path.join(this.backupsDir, f));
          return {
            nombre: f,
            fecha: stats.mtime.toLocaleString("es-EC"),
            tamanoKb: (stats.size / 1024).toFixed(2),
          };
        })
        .sort((a, b) => b.fecha.localeCompare(a.fecha));
    } catch {
      return [];
    }
  }
}
