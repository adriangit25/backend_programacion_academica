import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class LoggerService {
  private readonly logsDir = "/app/logs";

  private getLogFilePath(): string {
    const fecha = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return path.join(this.logsDir, `PUCESI_${fecha}.txt`);
  }

  private formatearFecha(): string {
    const now = new Date();
    return now.toLocaleString("es-EC", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  private escribir(nivel: string, mensaje: string): void {
    try {
      if (!fs.existsSync(this.logsDir)) {
        fs.mkdirSync(this.logsDir, { recursive: true });
      }
      const linea = `[${this.formatearFecha()}] [${nivel}] ${mensaje}\n`;
      fs.appendFileSync(this.getLogFilePath(), linea, "utf8");
    } catch (error) {
      console.error("Error escribiendo log:", error);
    }
  }

  info(mensaje: string): void {
    this.escribir("INFO", mensaje);
  }

  warn(mensaje: string): void {
    this.escribir("WARN", mensaje);
  }

  error(mensaje: string): void {
    this.escribir("ERROR", mensaje);
  }

  accion(
    usuarioId: number,
    usuario: string,
    accion: string,
    detalle: string,
    ip: string,
  ): void {
    const mensaje = `Usuario: ${usuario} (ID:${usuarioId}) | Accion: ${accion} | ${detalle} | IP: ${ip}`;
    this.escribir("ACCION", mensaje);
  }
}
