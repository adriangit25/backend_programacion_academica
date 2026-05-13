import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { CreateRolDto } from "./dto/create-rol.dto";
import { AssignRolDto } from "./dto/assign-rol.dto";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { AssignMenuRolDto } from "./dto/assign-menu-rol.dto";
import { CreateEscuelaDto } from "./dto/create-escuela.dto";
import { CreateCarreraDto } from "./dto/create-carrera.dto";
import { CreateAreaConocimientoDto } from "./dto/create-area-conocimiento.dto";
import { CreatePlanEstudioDto } from "./dto/create-plan-estudio.dto";
import { CreateMateriaDto } from "./dto/create-materia.dto";
import { CreateDocenteDto } from "./dto/create-docente.dto";
import { AssignDocenteAreaDto } from "./dto/assign-docente-area.dto";
import { CreatePeriodoDto } from "./dto/create-periodo.dto";
import { CreateDiaDto } from "./dto/create-dia.dto";
import { CreateBloqueHorarioDto } from "./dto/create-bloque-horario.dto";
import { CreateParaleloDto } from "./dto/create-paralelo.dto";
import { CreateAulaDto } from "./dto/create-aula.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class ProgramacionAcademicaService {
  constructor(private readonly db: DatabaseService) {}

  // ==================== USUARIOS ====================

  async createUsuario(dto: CreateUsuarioDto) {
    const existe = await this.db.query(
      "SELECT usu_id FROM tbl_usuarios WHERE usu_usuario = $1 OR usu_identificacion = $2",
      [dto.usu_usuario, dto.usu_identificacion],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El usuario o identificación ya existe");
    }

    const hashedPassword = await bcrypt.hash(dto.usu_contrasenia, 10);

    const result = await this.db.query(
      `INSERT INTO tbl_usuarios (usu_identificacion, usu_nombres, usu_apellidos, usu_usuario, usu_contrasenia, usu_estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        dto.usu_identificacion,
        dto.usu_nombres,
        dto.usu_apellidos,
        dto.usu_usuario,
        hashedPassword,
        dto.usu_estado ?? true,
      ],
    );

    const usuario = result.rows[0];
    delete usuario.usu_contrasenia;
    return { message: "Usuario creado exitosamente", usuario };
  }

  async findAllUsuarios() {
    const result = await this.db.query(
      `SELECT usu_id, usu_identificacion, usu_nombres, usu_apellidos, usu_usuario, usu_estado 
       FROM tbl_usuarios ORDER BY usu_id`,
    );
    return result.rows;
  }

  async findOneUsuario(id: number) {
    const result = await this.db.query(
      `SELECT usu_id, usu_identificacion, usu_nombres, usu_apellidos, usu_usuario, usu_estado 
       FROM tbl_usuarios WHERE usu_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Usuario no encontrado");
    }

    return result.rows[0];
  }

  async updateUsuario(id: number, dto: CreateUsuarioDto) {
    await this.findOneUsuario(id);

    const hashedPassword = dto.usu_contrasenia
      ? await bcrypt.hash(dto.usu_contrasenia, 10)
      : undefined;

    const result = await this.db.query(
      `UPDATE tbl_usuarios SET usu_identificacion = $1, usu_nombres = $2, usu_apellidos = $3, 
       usu_usuario = $4, usu_contrasenia = COALESCE($5, usu_contrasenia), usu_estado = $6
       WHERE usu_id = $7 RETURNING usu_id, usu_identificacion, usu_nombres, usu_apellidos, usu_usuario, usu_estado`,
      [
        dto.usu_identificacion,
        dto.usu_nombres,
        dto.usu_apellidos,
        dto.usu_usuario,
        hashedPassword,
        dto.usu_estado ?? true,
        id,
      ],
    );

    return {
      message: "Usuario actualizado exitosamente",
      usuario: result.rows[0],
    };
  }

  async deleteUsuario(id: number) {
    await this.findOneUsuario(id);
    await this.db.query(
      "UPDATE tbl_usuarios SET usu_estado = FALSE WHERE usu_id = $1",
      [id],
    );
    return { message: "Usuario eliminado exitosamente" };
  }

  // ==================== ROLES ====================

  async createRol(dto: CreateRolDto) {
    const existe = await this.db.query(
      "SELECT rol_id FROM tbl_roles WHERE rol_nombre = $1",
      [dto.rol_nombre],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El rol ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_roles (rol_nombre, rol_descripcion, rol_estado)
       VALUES ($1, $2, $3) RETURNING *`,
      [dto.rol_nombre, dto.rol_descripcion ?? null, dto.rol_estado ?? true],
    );

    return { message: "Rol creado exitosamente", rol: result.rows[0] };
  }

  async findAllRoles() {
    const result = await this.db.query(
      "SELECT * FROM tbl_roles ORDER BY rol_id",
    );
    return result.rows;
  }

  async findOneRol(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_roles WHERE rol_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Rol no encontrado");
    }

    return result.rows[0];
  }

  async updateRol(id: number, dto: CreateRolDto) {
    await this.findOneRol(id);

    const result = await this.db.query(
      `UPDATE tbl_roles SET rol_nombre = $1, rol_descripcion = $2, rol_estado = $3
       WHERE rol_id = $4 RETURNING *`,
      [dto.rol_nombre, dto.rol_descripcion ?? null, dto.rol_estado ?? true, id],
    );

    return { message: "Rol actualizado exitosamente", rol: result.rows[0] };
  }

  async deleteRol(id: number) {
    await this.findOneRol(id);
    await this.db.query(
      "UPDATE tbl_roles SET rol_estado = FALSE WHERE rol_id = $1",
      [id],
    );
    return { message: "Rol eliminado exitosamente" };
  }

  // ==================== ASIGNAR ROL A USUARIO ====================

  async assignRol(dto: AssignRolDto) {
    const existe = await this.db.query(
      "SELECT usr_id FROM tbl_usuario_rol WHERE usu_id = $1 AND rol_id = $2",
      [dto.usu_id, dto.rol_id],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El usuario ya tiene ese rol asignado");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_usuario_rol (usu_id, rol_id, usr_estado)
       VALUES ($1, $2, TRUE) RETURNING *`,
      [dto.usu_id, dto.rol_id],
    );

    return { message: "Rol asignado exitosamente", asignacion: result.rows[0] };
  }

  async getRolesByUsuario(usuId: number) {
    const result = await this.db.query(
      `SELECT r.rol_id, r.rol_nombre, r.rol_descripcion
       FROM tbl_usuario_rol ur
       INNER JOIN tbl_roles r ON ur.rol_id = r.rol_id
       WHERE ur.usu_id = $1 AND ur.usr_estado = TRUE AND r.rol_estado = TRUE`,
      [usuId],
    );

    return result.rows;
  }

  // ==================== MENÚS ====================

  async createMenu(dto: CreateMenuDto) {
    const result = await this.db.query(
      `INSERT INTO tbl_menus (men_nombre, men_icono, men_url, men_orden, men_padre_id, men_estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        dto.men_nombre,
        dto.men_icono ?? null,
        dto.men_url ?? null,
        dto.men_orden,
        dto.men_padre_id ?? null,
        dto.men_estado ?? true,
      ],
    );

    return { message: "Menú creado exitosamente", menu: result.rows[0] };
  }

  async findAllMenus() {
    const result = await this.db.query(
      "SELECT * FROM tbl_menus WHERE men_estado = TRUE ORDER BY men_orden, men_padre_id",
    );
    return result.rows;
  }

  async findOneMenu(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_menus WHERE men_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Menú no encontrado");
    }

    return result.rows[0];
  }

  async updateMenu(id: number, dto: CreateMenuDto) {
    await this.findOneMenu(id);

    const result = await this.db.query(
      `UPDATE tbl_menus SET men_nombre = $1, men_icono = $2, men_url = $3, men_orden = $4, men_padre_id = $5, men_estado = $6
       WHERE men_id = $7 RETURNING *`,
      [
        dto.men_nombre,
        dto.men_icono ?? null,
        dto.men_url ?? null,
        dto.men_orden,
        dto.men_padre_id ?? null,
        dto.men_estado ?? true,
        id,
      ],
    );

    return { message: "Menú actualizado exitosamente", menu: result.rows[0] };
  }

  async deleteMenu(id: number) {
    await this.findOneMenu(id);
    await this.db.query(
      "UPDATE tbl_menus SET men_estado = FALSE WHERE men_id = $1",
      [id],
    );
    return { message: "Menú eliminado exitosamente" };
  }

  // ==================== ASIGNAR MENÚ A ROL ====================

  async assignMenuRol(dto: AssignMenuRolDto) {
    const existe = await this.db.query(
      "SELECT rom_id FROM tbl_rol_menu WHERE rol_id = $1 AND men_id = $2",
      [dto.rol_id, dto.men_id],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El menú ya está asignado a ese rol");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_rol_menu (rol_id, men_id, rom_estado)
       VALUES ($1, $2, TRUE) RETURNING *`,
      [dto.rol_id, dto.men_id],
    );

    return {
      message: "Menú asignado al rol exitosamente",
      asignacion: result.rows[0],
    };
  }

  async getMenusByRol(rolId: number) {
    const result = await this.db.query(
      `SELECT m.men_id, m.men_nombre, m.men_icono, m.men_url, m.men_orden, m.men_padre_id
       FROM tbl_menus m
       INNER JOIN tbl_rol_menu rm ON m.men_id = rm.men_id
       WHERE rm.rol_id = $1 AND rm.rom_estado = TRUE AND m.men_estado = TRUE
       ORDER BY m.men_orden, m.men_padre_id`,
      [rolId],
    );

    return result.rows;
  }

  // ==================== ESCUELAS ====================

  async createEscuela(dto: CreateEscuelaDto) {
    const existe = await this.db.query(
      "SELECT esc_id FROM tbl_escuelas WHERE esc_codigo = $1",
      [dto.esc_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de escuela ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_escuelas (esc_codigo, esc_nombre, esc_descripcion, esc_estado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        dto.esc_codigo,
        dto.esc_nombre,
        dto.esc_descripcion ?? null,
        dto.esc_estado ?? true,
      ],
    );

    return { message: "Escuela creada exitosamente", escuela: result.rows[0] };
  }

  async findAllEscuelas() {
    const result = await this.db.query(
      "SELECT * FROM tbl_escuelas ORDER BY esc_id",
    );
    return result.rows;
  }

  async findOneEscuela(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_escuelas WHERE esc_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Escuela no encontrada");
    }

    return result.rows[0];
  }

  async updateEscuela(id: number, dto: CreateEscuelaDto) {
    await this.findOneEscuela(id);

    const result = await this.db.query(
      `UPDATE tbl_escuelas SET esc_codigo = $1, esc_nombre = $2, esc_descripcion = $3, esc_estado = $4
       WHERE esc_id = $5 RETURNING *`,
      [
        dto.esc_codigo,
        dto.esc_nombre,
        dto.esc_descripcion ?? null,
        dto.esc_estado ?? true,
        id,
      ],
    );

    return {
      message: "Escuela actualizada exitosamente",
      escuela: result.rows[0],
    };
  }

  async deleteEscuela(id: number) {
    await this.findOneEscuela(id);
    await this.db.query(
      "UPDATE tbl_escuelas SET esc_estado = FALSE WHERE esc_id = $1",
      [id],
    );
    return { message: "Escuela eliminada exitosamente" };
  }

  // ==================== CARRERAS ====================

  async createCarrera(dto: CreateCarreraDto) {
    const existe = await this.db.query(
      "SELECT car_id FROM tbl_carreras WHERE car_codigo = $1",
      [dto.car_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de carrera ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_carreras (car_codigo, car_nombre, car_modalidad, car_descripcion, esc_id, car_estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        dto.car_codigo,
        dto.car_nombre,
        dto.car_modalidad ?? "Presencial",
        dto.car_descripcion ?? null,
        dto.esc_id,
        dto.car_estado ?? true,
      ],
    );

    return { message: "Carrera creada exitosamente", carrera: result.rows[0] };
  }

  async findAllCarreras() {
    const result = await this.db.query(
      `SELECT c.*, e.esc_nombre 
       FROM tbl_carreras c 
       INNER JOIN tbl_escuelas e ON c.esc_id = e.esc_id 
       ORDER BY c.car_id`,
    );
    return result.rows;
  }

  async findOneCarrera(id: number) {
    const result = await this.db.query(
      `SELECT c.*, e.esc_nombre 
       FROM tbl_carreras c 
       INNER JOIN tbl_escuelas e ON c.esc_id = e.esc_id 
       WHERE c.car_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Carrera no encontrada");
    }

    return result.rows[0];
  }

  async updateCarrera(id: number, dto: CreateCarreraDto) {
    await this.findOneCarrera(id);

    const result = await this.db.query(
      `UPDATE tbl_carreras SET car_codigo = $1, car_nombre = $2, car_modalidad = $3, car_descripcion = $4, esc_id = $5, car_estado = $6
       WHERE car_id = $7 RETURNING *`,
      [
        dto.car_codigo,
        dto.car_nombre,
        dto.car_modalidad ?? "Presencial",
        dto.car_descripcion ?? null,
        dto.esc_id,
        dto.car_estado ?? true,
        id,
      ],
    );

    return {
      message: "Carrera actualizada exitosamente",
      carrera: result.rows[0],
    };
  }

  async deleteCarrera(id: number) {
    await this.findOneCarrera(id);
    await this.db.query(
      "UPDATE tbl_carreras SET car_estado = FALSE WHERE car_id = $1",
      [id],
    );
    return { message: "Carrera eliminada exitosamente" };
  }

  async getCarrerasByEscuela(escId: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_carreras WHERE esc_id = $1 AND car_estado = TRUE ORDER BY car_nombre",
      [escId],
    );
    return result.rows;
  }

  // ==================== ÁREAS DE CONOCIMIENTO ====================

  async createAreaConocimiento(dto: CreateAreaConocimientoDto) {
    const existe = await this.db.query(
      "SELECT arc_id FROM tbl_area_conocimiento WHERE arc_nombre = $1",
      [dto.arc_nombre],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El área de conocimiento ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_area_conocimiento (arc_nombre, arc_descripcion, arc_estado)
       VALUES ($1, $2, $3) RETURNING *`,
      [dto.arc_nombre, dto.arc_descripcion ?? null, dto.arc_estado ?? true],
    );

    return {
      message: "Área de conocimiento creada exitosamente",
      area: result.rows[0],
    };
  }

  async findAllAreasConocimiento() {
    const result = await this.db.query(
      "SELECT * FROM tbl_area_conocimiento ORDER BY arc_id",
    );
    return result.rows;
  }

  async findOneAreaConocimiento(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_area_conocimiento WHERE arc_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Área de conocimiento no encontrada");
    }

    return result.rows[0];
  }

  async updateAreaConocimiento(id: number, dto: CreateAreaConocimientoDto) {
    await this.findOneAreaConocimiento(id);

    const result = await this.db.query(
      `UPDATE tbl_area_conocimiento SET arc_nombre = $1, arc_descripcion = $2, arc_estado = $3
       WHERE arc_id = $4 RETURNING *`,
      [dto.arc_nombre, dto.arc_descripcion ?? null, dto.arc_estado ?? true, id],
    );

    return {
      message: "Área de conocimiento actualizada exitosamente",
      area: result.rows[0],
    };
  }

  async deleteAreaConocimiento(id: number) {
    await this.findOneAreaConocimiento(id);
    await this.db.query(
      "UPDATE tbl_area_conocimiento SET arc_estado = FALSE WHERE arc_id = $1",
      [id],
    );
    return { message: "Área de conocimiento eliminada exitosamente" };
  }
  // ==================== PLAN DE ESTUDIO ====================

  async createPlanEstudio(dto: CreatePlanEstudioDto) {
    const existe = await this.db.query(
      "SELECT pln_id FROM tbl_plan_estudio WHERE pln_codigo = $1",
      [dto.pln_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de plan de estudio ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_plan_estudio (pln_codigo, pln_nombre, pln_anio, pln_descripcion, car_id, pln_estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        dto.pln_codigo,
        dto.pln_nombre,
        dto.pln_anio,
        dto.pln_descripcion ?? null,
        dto.car_id,
        dto.pln_estado ?? true,
      ],
    );

    return {
      message: "Plan de estudio creado exitosamente",
      plan: result.rows[0],
    };
  }

  async findAllPlanesEstudio() {
    const result = await this.db.query(
      `SELECT p.*, c.car_nombre, e.esc_nombre
       FROM tbl_plan_estudio p
       INNER JOIN tbl_carreras c ON p.car_id = c.car_id
       INNER JOIN tbl_escuelas e ON c.esc_id = e.esc_id
       ORDER BY p.pln_id`,
    );
    return result.rows;
  }

  async findOnePlanEstudio(id: number) {
    const result = await this.db.query(
      `SELECT p.*, c.car_nombre, e.esc_nombre
       FROM tbl_plan_estudio p
       INNER JOIN tbl_carreras c ON p.car_id = c.car_id
       INNER JOIN tbl_escuelas e ON c.esc_id = e.esc_id
       WHERE p.pln_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Plan de estudio no encontrado");
    }

    return result.rows[0];
  }

  async updatePlanEstudio(id: number, dto: CreatePlanEstudioDto) {
    await this.findOnePlanEstudio(id);

    const result = await this.db.query(
      `UPDATE tbl_plan_estudio SET pln_codigo = $1, pln_nombre = $2, pln_anio = $3, pln_descripcion = $4, car_id = $5, pln_estado = $6
       WHERE pln_id = $7 RETURNING *`,
      [
        dto.pln_codigo,
        dto.pln_nombre,
        dto.pln_anio,
        dto.pln_descripcion ?? null,
        dto.car_id,
        dto.pln_estado ?? true,
        id,
      ],
    );

    return {
      message: "Plan de estudio actualizado exitosamente",
      plan: result.rows[0],
    };
  }

  async deletePlanEstudio(id: number) {
    await this.findOnePlanEstudio(id);
    await this.db.query(
      "UPDATE tbl_plan_estudio SET pln_estado = FALSE WHERE pln_id = $1",
      [id],
    );
    return { message: "Plan de estudio eliminado exitosamente" };
  }

  async getPlanesEstudioByCarrera(carId: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_plan_estudio WHERE car_id = $1 AND pln_estado = TRUE ORDER BY pln_anio DESC",
      [carId],
    );
    return result.rows;
  }

  // ==================== MATERIAS ====================

  async createMateria(dto: CreateMateriaDto) {
    const existe = await this.db.query(
      "SELECT mat_id FROM tbl_materias WHERE mat_codigo = $1",
      [dto.mat_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de materia ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_materias (mat_codigo, mat_nombre, mat_descripcion, mat_nivel, mat_horas_docencia, mat_horas_practicas, mat_horas_autonomas, mat_total_horas, mat_estudiantes_estimado, pln_id, arc_id, mat_estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        dto.mat_codigo,
        dto.mat_nombre,
        dto.mat_descripcion ?? null,
        dto.mat_nivel,
        dto.mat_horas_docencia,
        dto.mat_horas_practicas ?? 0,
        dto.mat_horas_autonomas ?? 0,
        dto.mat_total_horas,
        dto.mat_estudiantes_estimado ?? 0,
        dto.pln_id,
        dto.arc_id,
        dto.mat_estado ?? true,
      ],
    );

    return { message: "Materia creada exitosamente", materia: result.rows[0] };
  }

  async findAllMaterias() {
    const result = await this.db.query(
      `SELECT m.*, p.pln_nombre, a.arc_nombre, c.car_nombre
       FROM tbl_materias m
       INNER JOIN tbl_plan_estudio p ON m.pln_id = p.pln_id
       INNER JOIN tbl_area_conocimiento a ON m.arc_id = a.arc_id
       INNER JOIN tbl_carreras c ON p.car_id = c.car_id
       ORDER BY m.mat_nivel, m.mat_nombre`,
    );
    return result.rows;
  }

  async findOneMateria(id: number) {
    const result = await this.db.query(
      `SELECT m.*, p.pln_nombre, a.arc_nombre, c.car_nombre
       FROM tbl_materias m
       INNER JOIN tbl_plan_estudio p ON m.pln_id = p.pln_id
       INNER JOIN tbl_area_conocimiento a ON m.arc_id = a.arc_id
       INNER JOIN tbl_carreras c ON p.car_id = c.car_id
       WHERE m.mat_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Materia no encontrada");
    }

    return result.rows[0];
  }

  async updateMateria(id: number, dto: CreateMateriaDto) {
    await this.findOneMateria(id);

    const result = await this.db.query(
      `UPDATE tbl_materias SET mat_codigo = $1, mat_nombre = $2, mat_descripcion = $3, mat_nivel = $4, mat_horas_docencia = $5, mat_horas_practicas = $6, mat_horas_autonomas = $7, mat_total_horas = $8, mat_estudiantes_estimado = $9, pln_id = $10, arc_id = $11, mat_estado = $12
       WHERE mat_id = $13 RETURNING *`,
      [
        dto.mat_codigo,
        dto.mat_nombre,
        dto.mat_descripcion ?? null,
        dto.mat_nivel,
        dto.mat_horas_docencia,
        dto.mat_horas_practicas ?? 0,
        dto.mat_horas_autonomas ?? 0,
        dto.mat_total_horas,
        dto.mat_estudiantes_estimado ?? 0,
        dto.pln_id,
        dto.arc_id,
        dto.mat_estado ?? true,
        id,
      ],
    );

    return {
      message: "Materia actualizada exitosamente",
      materia: result.rows[0],
    };
  }

  async deleteMateria(id: number) {
    await this.findOneMateria(id);
    await this.db.query(
      "UPDATE tbl_materias SET mat_estado = FALSE WHERE mat_id = $1",
      [id],
    );
    return { message: "Materia eliminada exitosamente" };
  }

  async getMateriasByPlan(plnId: number) {
    const result = await this.db.query(
      `SELECT m.*, a.arc_nombre
       FROM tbl_materias m
       INNER JOIN tbl_area_conocimiento a ON m.arc_id = a.arc_id
       WHERE m.pln_id = $1 AND m.mat_estado = TRUE
       ORDER BY m.mat_nivel, m.mat_nombre`,
      [plnId],
    );
    return result.rows;
  }

  // ==================== DOCENTES ====================

  async createDocente(dto: CreateDocenteDto) {
    const existe = await this.db.query(
      "SELECT doc_id FROM tbl_docentes WHERE usu_id = $1",
      [dto.usu_id],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException(
        "El usuario ya está registrado como docente",
      );
    }

    const result = await this.db.query(
      `INSERT INTO tbl_docentes (usu_id, doc_titulo_grado, doc_titulo_posgrado, doc_tipo_contrato, doc_dedicacion, doc_horas_minimas, doc_horas_maximas, doc_observaciones, doc_estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        dto.usu_id,
        dto.doc_titulo_grado ?? null,
        dto.doc_titulo_posgrado ?? null,
        dto.doc_tipo_contrato ?? null,
        dto.doc_dedicacion,
        dto.doc_horas_minimas,
        dto.doc_horas_maximas,
        dto.doc_observaciones ?? null,
        dto.doc_estado ?? true,
      ],
    );

    return { message: "Docente creado exitosamente", docente: result.rows[0] };
  }

  async findAllDocentes() {
    const result = await this.db.query(
      `SELECT d.*, u.usu_nombres, u.usu_apellidos, u.usu_identificacion
       FROM tbl_docentes d
       INNER JOIN tbl_usuarios u ON d.usu_id = u.usu_id
       ORDER BY u.usu_apellidos, u.usu_nombres`,
    );
    return result.rows;
  }

  async findOneDocente(id: number) {
    const result = await this.db.query(
      `SELECT d.*, u.usu_nombres, u.usu_apellidos, u.usu_identificacion
       FROM tbl_docentes d
       INNER JOIN tbl_usuarios u ON d.usu_id = u.usu_id
       WHERE d.doc_id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Docente no encontrado");
    }

    return result.rows[0];
  }

  async updateDocente(id: number, dto: CreateDocenteDto) {
    await this.findOneDocente(id);

    const result = await this.db.query(
      `UPDATE tbl_docentes SET usu_id = $1, doc_titulo_grado = $2, doc_titulo_posgrado = $3, doc_tipo_contrato = $4, doc_dedicacion = $5, doc_horas_minimas = $6, doc_horas_maximas = $7, doc_observaciones = $8, doc_estado = $9
       WHERE doc_id = $10 RETURNING *`,
      [
        dto.usu_id,
        dto.doc_titulo_grado ?? null,
        dto.doc_titulo_posgrado ?? null,
        dto.doc_tipo_contrato ?? null,
        dto.doc_dedicacion,
        dto.doc_horas_minimas,
        dto.doc_horas_maximas,
        dto.doc_observaciones ?? null,
        dto.doc_estado ?? true,
        id,
      ],
    );

    return {
      message: "Docente actualizado exitosamente",
      docente: result.rows[0],
    };
  }

  async deleteDocente(id: number) {
    await this.findOneDocente(id);
    await this.db.query(
      "UPDATE tbl_docentes SET doc_estado = FALSE WHERE doc_id = $1",
      [id],
    );
    return { message: "Docente eliminado exitosamente" };
  }

  // ==================== DOCENTE - ÁREA ====================

  async assignDocenteArea(dto: AssignDocenteAreaDto) {
    const existe = await this.db.query(
      "SELECT doa_id FROM tbl_docente_area WHERE doc_id = $1 AND arc_id = $2",
      [dto.doc_id, dto.arc_id],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El docente ya tiene esa área asignada");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_docente_area (doc_id, arc_id, doa_estado)
       VALUES ($1, $2, TRUE) RETURNING *`,
      [dto.doc_id, dto.arc_id],
    );

    return {
      message: "Área asignada al docente exitosamente",
      asignacion: result.rows[0],
    };
  }

  async getAreasByDocente(docId: number) {
    const result = await this.db.query(
      `SELECT a.arc_id, a.arc_nombre, a.arc_descripcion
       FROM tbl_docente_area da
       INNER JOIN tbl_area_conocimiento a ON da.arc_id = a.arc_id
       WHERE da.doc_id = $1 AND da.doa_estado = TRUE AND a.arc_estado = TRUE`,
      [docId],
    );
    return result.rows;
  }

  // ==================== PERÍODOS ====================

  async createPeriodo(dto: CreatePeriodoDto) {
    const existe = await this.db.query(
      "SELECT per_id FROM tbl_periodos WHERE per_codigo = $1",
      [dto.per_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de período ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_periodos (per_codigo, per_nombre, per_fecha_inicio, per_fecha_fin, per_semanas, per_estado)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        dto.per_codigo,
        dto.per_nombre,
        dto.per_fecha_inicio,
        dto.per_fecha_fin,
        dto.per_semanas ?? 16,
        dto.per_estado ?? true,
      ],
    );

    return { message: "Período creado exitosamente", periodo: result.rows[0] };
  }

  async findAllPeriodos() {
    const result = await this.db.query(
      "SELECT * FROM tbl_periodos ORDER BY per_fecha_inicio DESC",
    );
    return result.rows;
  }

  async findOnePeriodo(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_periodos WHERE per_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Período no encontrado");
    }

    return result.rows[0];
  }

  async updatePeriodo(id: number, dto: CreatePeriodoDto) {
    await this.findOnePeriodo(id);

    const result = await this.db.query(
      `UPDATE tbl_periodos SET per_codigo = $1, per_nombre = $2, per_fecha_inicio = $3, per_fecha_fin = $4, per_semanas = $5, per_estado = $6
       WHERE per_id = $7 RETURNING *`,
      [
        dto.per_codigo,
        dto.per_nombre,
        dto.per_fecha_inicio,
        dto.per_fecha_fin,
        dto.per_semanas ?? 16,
        dto.per_estado ?? true,
        id,
      ],
    );

    return {
      message: "Período actualizado exitosamente",
      periodo: result.rows[0],
    };
  }

  async deletePeriodo(id: number) {
    await this.findOnePeriodo(id);
    await this.db.query(
      "UPDATE tbl_periodos SET per_estado = FALSE WHERE per_id = $1",
      [id],
    );
    return { message: "Período eliminado exitosamente" };
  }

  // ==================== DÍAS ====================

  async createDia(dto: CreateDiaDto) {
    const result = await this.db.query(
      `INSERT INTO tbl_dias (dia_nombre, dia_abreviatura, dia_orden)
       VALUES ($1, $2, $3) RETURNING *`,
      [dto.dia_nombre, dto.dia_abreviatura, dto.dia_orden],
    );

    return { message: "Día creado exitosamente", dia: result.rows[0] };
  }

  async findAllDias() {
    const result = await this.db.query(
      "SELECT * FROM tbl_dias ORDER BY dia_orden",
    );
    return result.rows;
  }

  // ==================== BLOQUES HORARIOS ====================

  async createBloqueHorario(dto: CreateBloqueHorarioDto) {
    const result = await this.db.query(
      `INSERT INTO tbl_bloques_horarios (blq_hora_inicio, blq_hora_fin, blq_descripcion, blq_orden)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        dto.blq_hora_inicio,
        dto.blq_hora_fin,
        dto.blq_descripcion ?? null,
        dto.blq_orden,
      ],
    );

    return {
      message: "Bloque horario creado exitosamente",
      bloque: result.rows[0],
    };
  }

  async findAllBloquesHorarios() {
    const result = await this.db.query(
      "SELECT * FROM tbl_bloques_horarios ORDER BY blq_orden",
    );
    return result.rows;
  }

  // ==================== PARALELOS ====================

  async createParalelo(dto: CreateParaleloDto) {
    const existe = await this.db.query(
      "SELECT par_id FROM tbl_paralelos WHERE par_nombre = $1",
      [dto.par_nombre],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El paralelo ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_paralelos (par_nombre, par_descripcion, par_estado)
       VALUES ($1, $2, $3) RETURNING *`,
      [dto.par_nombre, dto.par_descripcion ?? null, dto.par_estado ?? true],
    );

    return {
      message: "Paralelo creado exitosamente",
      paralelo: result.rows[0],
    };
  }

  async findAllParalelos() {
    const result = await this.db.query(
      "SELECT * FROM tbl_paralelos ORDER BY par_nombre",
    );
    return result.rows;
  }

  // ==================== AULAS ====================

  async createAula(dto: CreateAulaDto) {
    const existe = await this.db.query(
      "SELECT aul_id FROM tbl_aulas WHERE aul_codigo = $1",
      [dto.aul_codigo],
    );

    if (existe.rows.length > 0) {
      throw new BadRequestException("El código de aula ya existe");
    }

    const result = await this.db.query(
      `INSERT INTO tbl_aulas (aul_codigo, aul_nombre, aul_capacidad, aul_tipo, aul_estado)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        dto.aul_codigo,
        dto.aul_nombre,
        dto.aul_capacidad,
        dto.aul_tipo ?? null,
        dto.aul_estado ?? true,
      ],
    );

    return { message: "Aula creada exitosamente", aula: result.rows[0] };
  }

  async findAllAulas() {
    const result = await this.db.query(
      "SELECT * FROM tbl_aulas ORDER BY aul_codigo",
    );
    return result.rows;
  }

  async findOneAula(id: number) {
    const result = await this.db.query(
      "SELECT * FROM tbl_aulas WHERE aul_id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException("Aula no encontrada");
    }

    return result.rows[0];
  }

  async updateAula(id: number, dto: CreateAulaDto) {
    await this.findOneAula(id);

    const result = await this.db.query(
      `UPDATE tbl_aulas SET aul_codigo = $1, aul_nombre = $2, aul_capacidad = $3, aul_tipo = $4, aul_estado = $5
       WHERE aul_id = $6 RETURNING *`,
      [
        dto.aul_codigo,
        dto.aul_nombre,
        dto.aul_capacidad,
        dto.aul_tipo ?? null,
        dto.aul_estado ?? true,
        id,
      ],
    );

    return { message: "Aula actualizada exitosamente", aula: result.rows[0] };
  }

  async deleteAula(id: number) {
    await this.findOneAula(id);
    await this.db.query(
      "UPDATE tbl_aulas SET aul_estado = FALSE WHERE aul_id = $1",
      [id],
    );
    return { message: "Aula eliminada exitosamente" };
  }
}
