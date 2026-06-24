import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, tap, catchError, throwError } from "rxjs";
import { LoggerService } from "./logger.service";
import { Request, Response } from "express";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const inicio = Date.now();

    const metodo = req.method;
    const url = req.url;
    const ip =
      req.ip || (req.headers["x-forwarded-for"] as string) || "desconocida";
    const body = req.body;

    const user = (req as any).user;
    const usuarioId = user?.usu_id ?? 0;
    const usuarioNombre = user?.usu_usuario
      ? `${user.apellidos ?? ""} ${user.nombres ?? ""} (${user.usu_usuario})`
      : "anonimo";

    return next.handle().pipe(
      tap(() => {
        const duracion = Date.now() - inicio;
        const status = res.statusCode;

        if (["POST", "PUT", "DELETE", "PATCH"].includes(metodo)) {
          const accion = `${metodo} ${url}`;
          const detalle = this.describir(metodo, url, body, status, duracion);
          this.logger.accion(usuarioId, usuarioNombre, accion, detalle, ip);
        }
      }),
      catchError((error) => {
        const status = error.status ?? 500;
        this.logger.error(
          `Usuario: ${usuarioNombre} (ID:${usuarioId}) | Accion: ${metodo} ${url} | Status: ${status} | Error: ${error.message} | IP: ${ip}`,
        );
        return throwError(() => error);
      }),
    );
  }

  private describir(
    metodo: string,
    url: string,
    body: any,
    status: number,
    duracion: number,
  ): string {
    const partes: string[] = [];

    if (url.includes("/login")) {
      partes.push("Inicio de sesion");
    } else if (url.includes("/paralelos")) {
      partes.push(
        metodo === "POST"
          ? "Paralelo creado"
          : metodo === "PUT"
            ? "Paralelo actualizado"
            : "Paralelo eliminado",
      );
      if (body?.par_nombre) partes.push(`paralelo: ${body.par_nombre}`);
    } else if (url.includes("/usuarios")) {
      partes.push(
        metodo === "POST"
          ? "Nuevo usuario creado"
          : metodo === "PUT"
            ? "Usuario actualizado"
            : "Usuario eliminado",
      );
      if (body?.usu_usuario) partes.push(`usu_usuario: ${body.usu_usuario}`);
    } else if (url.includes("/docente-area")) {
      partes.push("Area asignada a docente");
    } else if (url.includes("/docentes")) {
      partes.push(
        metodo === "POST"
          ? "Nuevo docente registrado"
          : metodo === "PUT"
            ? "Docente actualizado"
            : "Docente eliminado",
      );
    } else if (url.includes("/confirmar-horarios")) {
      partes.push("Horarios IA confirmados y guardados");
    } else if (url.includes("/generar-horarios")) {
      partes.push("Algoritmo genetico ejecutado");
    } else if (url.includes("/horarios")) {
      partes.push(
        metodo === "POST"
          ? "Horario asignado"
          : metodo === "DELETE"
            ? "Horario eliminado"
            : "Horario actualizado",
      );
    } else if (
      url.includes("/abrir-nivel") ||
      url.includes("/abrir-materias")
    ) {
      partes.push("Programacion academica abierta");
    } else if (url.includes("/periodos")) {
      partes.push(
        metodo === "POST"
          ? "Periodo creado"
          : metodo === "PUT"
            ? "Periodo actualizado"
            : "Periodo eliminado",
      );
      if (body?.per_nombre) partes.push(`periodo: ${body.per_nombre}`);
    } else if (url.includes("/materias")) {
      partes.push(
        metodo === "POST"
          ? "Materia creada"
          : metodo === "PUT"
            ? "Materia actualizada"
            : "Materia eliminada",
      );
      if (body?.mat_nombre) partes.push(`materia: ${body.mat_nombre}`);
    } else if (url.includes("/bibliografia/upload")) {
      partes.push("Archivo PDF subido a bibliografia");
    } else if (url.includes("/bibliografia")) {
      partes.push(
        metodo === "POST"
          ? "Bibliografia registrada"
          : metodo === "PUT"
            ? "Bibliografia actualizada"
            : "Bibliografia eliminada",
      );
      if (body?.bib_titulo) partes.push(`titulo: ${body.bib_titulo}`);
    } else if (url.includes("/usuario-rol")) {
      partes.push("Rol asignado a usuario");
    } else if (url.includes("/escuelas")) {
      partes.push(
        metodo === "POST"
          ? "Escuela creada"
          : metodo === "PUT"
            ? "Escuela actualizada"
            : "Escuela eliminada",
      );
    } else if (url.includes("/carreras")) {
      partes.push(
        metodo === "POST"
          ? "Carrera creada"
          : metodo === "PUT"
            ? "Carrera actualizada"
            : "Carrera eliminada",
      );
    } else if (url.includes("/aulas")) {
      partes.push(
        metodo === "POST"
          ? "Aula registrada"
          : metodo === "PUT"
            ? "Aula actualizada"
            : "Aula eliminada",
      );
    } else if (url.includes("/areas-conocimiento")) {
      partes.push(
        metodo === "POST"
          ? "Area de conocimiento creada"
          : metodo === "PUT"
            ? "Area actualizada"
            : "Area eliminada",
      );
    } else if (url.includes("/planes-estudio")) {
      partes.push(
        metodo === "POST"
          ? "Plan de estudio creado"
          : metodo === "PUT"
            ? "Plan actualizado"
            : "Plan eliminado",
      );
    } else {
      partes.push(`Operacion: ${metodo} ${url}`);
    }

    partes.push(`Status: ${status} | ${duracion}ms`);
    return partes.join(" | ");
  }
}
