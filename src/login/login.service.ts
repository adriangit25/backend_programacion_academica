import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../database/database.service";
import { LoginDto } from "./dto/login.dto";
import { SelectRolDto } from "./dto/select-rol.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class LoginService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  // PASO 1: Validar credenciales y devolver roles
  async validate(loginDto: LoginDto) {
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
      `SELECT r.rol_id, r.rol_nombre, r.rol_descripcion
       FROM tbl_usuario_rol ur
       INNER JOIN tbl_roles r ON ur.rol_id = r.rol_id
       WHERE ur.usu_id = $1 AND ur.usr_estado = TRUE AND r.rol_estado = TRUE`,
      [usuario.usu_id],
    );

    const roles = rolesResult.rows;

    if (roles.length === 0) {
      throw new UnauthorizedException("El usuario no tiene roles asignados");
    }

    // 4. Si tiene un solo rol, login directo
    if (roles.length === 1) {
      return this.generateLogin(usuario, roles[0]);
    }

    // 5. Si tiene varios roles, devolver lista para que elija
    return {
      message: "Seleccione un rol para continuar",
      requires_role_selection: true,
      usuario: {
        usu_id: usuario.usu_id,
        usu_nombres: usuario.usu_nombres,
        usu_apellidos: usuario.usu_apellidos,
      },
      roles,
    };
  }

  // PASO 2: Seleccionar rol y generar token
  async selectRol(selectRolDto: SelectRolDto) {
    const { usu_id, rol_id } = selectRolDto;

    // 1. Validar que el usuario existe
    const userResult = await this.db.query(
      "SELECT * FROM tbl_usuarios WHERE usu_id = $1 AND usu_estado = TRUE",
      [usu_id],
    );

    if (userResult.rows.length === 0) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    const usuario = userResult.rows[0];

    // 2. Validar que el usuario tiene ese rol
    const rolResult = await this.db.query(
      `SELECT r.rol_id, r.rol_nombre, r.rol_descripcion
       FROM tbl_usuario_rol ur
       INNER JOIN tbl_roles r ON ur.rol_id = r.rol_id
       WHERE ur.usu_id = $1 AND ur.rol_id = $2 AND ur.usr_estado = TRUE AND r.rol_estado = TRUE`,
      [usu_id, rol_id],
    );

    if (rolResult.rows.length === 0) {
      throw new UnauthorizedException("El usuario no tiene ese rol asignado");
    }

    const rol = rolResult.rows[0];

    return this.generateLogin(usuario, rol);
  }

  // Método privado: genera el token y carga menús
  private async generateLogin(usuario: any, rol: any) {
    // Obtener menús del rol seleccionado
    const menusResult = await this.db.query(
      `SELECT m.men_id, m.men_nombre, m.men_icono, m.men_url, m.men_orden, m.men_padre_id
       FROM tbl_menus m
       INNER JOIN tbl_rol_menu rm ON m.men_id = rm.men_id
       WHERE rm.rol_id = $1 AND rm.rom_estado = TRUE AND m.men_estado = TRUE
       ORDER BY m.men_orden, m.men_padre_id`,
      [rol.rol_id],
    );

    const menus = menusResult.rows;

    // Generar JWT con el rol seleccionado
    const payload = {
      sub: usuario.usu_id,
      usuario: usuario.usu_usuario,
      nombres: usuario.usu_nombres,
      apellidos: usuario.usu_apellidos,
      rol: rol,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: "Login exitoso",
      requires_role_selection: false,
      token,
      usuario: {
        usu_id: usuario.usu_id,
        usu_identificacion: usuario.usu_identificacion,
        usu_nombres: usuario.usu_nombres,
        usu_apellidos: usuario.usu_apellidos,
        usu_usuario: usuario.usu_usuario,
        rol,
        menus,
      },
    };
  }
}
