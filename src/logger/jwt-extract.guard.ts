import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class JwtExtractGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers["authorization"];

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get<string>("JWT_SECRET"),
        });
        (req as any).user = {
          usu_id: payload.sub,
          usu_usuario: payload.usuario,
          nombres: payload.nombres,
          apellidos: payload.apellidos,
          rol: payload.rol,
        };
      } catch {
        // Token inválido o expirado — no bloqueamos, solo dejamos req.user vacío
      }
    }
    return true;
  }
}
