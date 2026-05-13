import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../database/database.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { usu_usuario, usu_contrasenia } = loginDto;

    // 1. Buscar usuario
    const userResult = await this.db.query(
      "SELECT * FROM tbl_usuarios WHERE usu_usuario = $1 AND usu_estado = TRUE",
      [usu_usuario],
    );

    if (userResult.rows.length === 0) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos");
    }

    const usuario = userResult.rows[0];

    // 2. Validar contraseña
    const isPasswordValid = await bcrypt.compare(
      usu_contrasenia,
      usuario.usu_contrasenia,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Usuario o contraseña incorrectos");
    }

    // 3. Obtener roles del usuario
    const rolesResult = await this.db.query(
      `SELECT r.rol_id, r.rol_nombre 
       FROM tbl_usuario_rol ur 
       INNER JOIN tbl_roles r ON ur.rol_id = r.rol_id 
       WHERE ur.usu_id = $1 AND ur.usr_estado = TRUE AND r.rol_estado = TRUE`,
      [usuario.usu_id],
    );

    const roles = rolesResult.rows;

    // 4. Obtener menús según los roles
    const rolIds = roles.map((r) => r.rol_id);
    const menusResult = await this.db.query(
      `SELECT DISTINCT m.men_id, m.men_nombre, m.men_icono, m.men_url, 
              m.men_orden, m.men_padre_id
       FROM tbl_menus m
       INNER JOIN tbl_rol_menu rm ON m.men_id = rm.men_id
       WHERE rm.rol_id = ANY($1) AND rm.rom_estado = TRUE AND m.men_estado = TRUE
       ORDER BY m.men_orden, m.men_padre_id`,
      [rolIds],
    );

    const menus = menusResult.rows;

    // 5. Generar JWT
    const payload = {
      sub: usuario.usu_id,
      usuario: usuario.usu_usuario,
      nombres: usuario.usu_nombres,
      apellidos: usuario.usu_apellidos,
      roles: roles,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: "Login exitoso",
      token,
      usuario: {
        usu_id: usuario.usu_id,
        usu_identificacion: usuario.usu_identificacion,
        usu_nombres: usuario.usu_nombres,
        usu_apellidos: usuario.usu_apellidos,
        usu_usuario: usuario.usu_usuario,
        roles,
        menus,
      },
    };
  }
}
