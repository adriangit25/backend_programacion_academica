import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProgramacionAcademicaService } from "./programacion-academica.service";
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
import { AssignCoordinadorCarreraDto } from "./dto/assign-coordinador-carrera.dto";
import { CreateProgramacionDto } from "./dto/create-programacion.dto";
import { AbrirNivelDto } from "./dto/abrir-nivel.dto";
import { AbrirMateriasDto } from "./dto/abrir-materias.dto";

@ApiTags("Programación Académica")
@Controller("programacion-academica")
export class ProgramacionAcademicaController {
  constructor(private readonly service: ProgramacionAcademicaService) {}

  // ==================== USUARIOS ====================

  @Post("usuarios")
  @ApiOperation({
    summary: "Crear usuario",
    description: "Registra un nuevo usuario en el sistema",
  })
  @ApiResponse({ status: 201, description: "Usuario creado exitosamente" })
  @ApiResponse({
    status: 400,
    description: "El usuario o identificación ya existe",
  })
  createUsuario(@Body() dto: CreateUsuarioDto) {
    return this.service.createUsuario(dto);
  }

  @Get("usuarios")
  @ApiOperation({
    summary: "Listar usuarios",
    description: "Obtiene todos los usuarios registrados",
  })
  @ApiResponse({ status: 200, description: "Lista de usuarios" })
  findAllUsuarios() {
    return this.service.findAllUsuarios();
  }

  @Get("usuarios/:id")
  @ApiOperation({
    summary: "Obtener usuario",
    description: "Obtiene un usuario por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del usuario" })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  findOneUsuario(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneUsuario(id);
  }

  @Put("usuarios/:id")
  @ApiOperation({
    summary: "Actualizar usuario",
    description: "Actualiza los datos de un usuario",
  })
  @ApiResponse({ status: 200, description: "Usuario actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  updateUsuario(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateUsuarioDto,
  ) {
    return this.service.updateUsuario(id, dto);
  }

  @Delete("usuarios/:id")
  @ApiOperation({
    summary: "Eliminar usuario",
    description: "Desactiva un usuario (eliminación lógica)",
  })
  @ApiResponse({ status: 200, description: "Usuario eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Usuario no encontrado" })
  deleteUsuario(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteUsuario(id);
  }

  // ==================== ROLES ====================

  @Post("roles")
  @ApiOperation({
    summary: "Crear rol",
    description: "Registra un nuevo rol en el sistema",
  })
  @ApiResponse({ status: 201, description: "Rol creado exitosamente" })
  @ApiResponse({ status: 400, description: "El rol ya existe" })
  createRol(@Body() dto: CreateRolDto) {
    return this.service.createRol(dto);
  }

  @Get("roles")
  @ApiOperation({
    summary: "Listar roles",
    description: "Obtiene todos los roles registrados",
  })
  @ApiResponse({ status: 200, description: "Lista de roles" })
  findAllRoles() {
    return this.service.findAllRoles();
  }

  @Get("roles/:id")
  @ApiOperation({
    summary: "Obtener rol",
    description: "Obtiene un rol por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del rol" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  findOneRol(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneRol(id);
  }

  @Put("roles/:id")
  @ApiOperation({
    summary: "Actualizar rol",
    description: "Actualiza los datos de un rol",
  })
  @ApiResponse({ status: 200, description: "Rol actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  updateRol(@Param("id", ParseIntPipe) id: number, @Body() dto: CreateRolDto) {
    return this.service.updateRol(id, dto);
  }

  @Delete("roles/:id")
  @ApiOperation({
    summary: "Eliminar rol",
    description: "Desactiva un rol (eliminación lógica)",
  })
  @ApiResponse({ status: 200, description: "Rol eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Rol no encontrado" })
  deleteRol(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteRol(id);
  }

  // ==================== ASIGNAR ROL ====================

  @Post("usuario-rol")
  @ApiOperation({
    summary: "Asignar rol a usuario",
    description: "Asigna un rol a un usuario",
  })
  @ApiResponse({ status: 201, description: "Rol asignado exitosamente" })
  @ApiResponse({ status: 400, description: "El usuario ya tiene ese rol" })
  assignRol(@Body() dto: AssignRolDto) {
    return this.service.assignRol(dto);
  }

  @Get("usuario-rol/:usuId")
  @ApiOperation({
    summary: "Roles de un usuario",
    description: "Obtiene los roles asignados a un usuario",
  })
  @ApiResponse({ status: 200, description: "Lista de roles del usuario" })
  getRolesByUsuario(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.service.getRolesByUsuario(usuId);
  }

  // ==================== MENÚS ====================

  @Post("menus")
  @ApiOperation({
    summary: "Crear menú",
    description: "Registra un nuevo menú en el sistema",
  })
  @ApiResponse({ status: 201, description: "Menú creado exitosamente" })
  createMenu(@Body() dto: CreateMenuDto) {
    return this.service.createMenu(dto);
  }

  @Get("menus")
  @ApiOperation({
    summary: "Listar menús",
    description: "Obtiene todos los menús activos",
  })
  @ApiResponse({ status: 200, description: "Lista de menús" })
  findAllMenus() {
    return this.service.findAllMenus();
  }

  @Get("menus/:id")
  @ApiOperation({
    summary: "Obtener menú",
    description: "Obtiene un menú por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del menú" })
  @ApiResponse({ status: 404, description: "Menú no encontrado" })
  findOneMenu(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneMenu(id);
  }

  @Put("menus/:id")
  @ApiOperation({
    summary: "Actualizar menú",
    description: "Actualiza los datos de un menú",
  })
  @ApiResponse({ status: 200, description: "Menú actualizado exitosamente" })
  @ApiResponse({ status: 404, description: "Menú no encontrado" })
  updateMenu(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateMenuDto,
  ) {
    return this.service.updateMenu(id, dto);
  }

  @Delete("menus/:id")
  @ApiOperation({
    summary: "Eliminar menú",
    description: "Desactiva un menú (eliminación lógica)",
  })
  @ApiResponse({ status: 200, description: "Menú eliminado exitosamente" })
  @ApiResponse({ status: 404, description: "Menú no encontrado" })
  deleteMenu(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteMenu(id);
  }

  // ==================== ASIGNAR MENÚ A ROL ====================

  @Post("rol-menu")
  @ApiOperation({
    summary: "Asignar menú a rol",
    description: "Asigna un menú a un rol",
  })
  @ApiResponse({ status: 201, description: "Menú asignado exitosamente" })
  @ApiResponse({
    status: 400,
    description: "El menú ya está asignado a ese rol",
  })
  assignMenuRol(@Body() dto: AssignMenuRolDto) {
    return this.service.assignMenuRol(dto);
  }

  @Get("rol-menu/:rolId")
  @ApiOperation({
    summary: "Menús de un rol",
    description: "Obtiene los menús asignados a un rol",
  })
  @ApiResponse({ status: 200, description: "Lista de menús del rol" })
  getMenusByRol(@Param("rolId", ParseIntPipe) rolId: number) {
    return this.service.getMenusByRol(rolId);
  }

  // ==================== ESCUELAS ====================

  @Post("escuelas")
  @ApiOperation({
    summary: "Crear escuela",
    description: "Registra una nueva escuela",
  })
  @ApiResponse({ status: 201, description: "Escuela creada exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createEscuela(@Body() dto: CreateEscuelaDto) {
    return this.service.createEscuela(dto);
  }

  @Get("escuelas")
  @ApiOperation({
    summary: "Listar escuelas",
    description: "Obtiene todas las escuelas",
  })
  @ApiResponse({ status: 200, description: "Lista de escuelas" })
  findAllEscuelas() {
    return this.service.findAllEscuelas();
  }

  @Get("escuelas/:id")
  @ApiOperation({
    summary: "Obtener escuela",
    description: "Obtiene una escuela por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos de la escuela" })
  @ApiResponse({ status: 404, description: "Escuela no encontrada" })
  findOneEscuela(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneEscuela(id);
  }

  @Put("escuelas/:id")
  @ApiOperation({
    summary: "Actualizar escuela",
    description: "Actualiza los datos de una escuela",
  })
  @ApiResponse({ status: 200, description: "Escuela actualizada exitosamente" })
  updateEscuela(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateEscuelaDto,
  ) {
    return this.service.updateEscuela(id, dto);
  }

  @Delete("escuelas/:id")
  @ApiOperation({
    summary: "Eliminar escuela",
    description: "Desactiva una escuela",
  })
  @ApiResponse({ status: 200, description: "Escuela eliminada exitosamente" })
  deleteEscuela(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteEscuela(id);
  }

  // ==================== CARRERAS ====================

  @Post("carreras")
  @ApiOperation({
    summary: "Crear carrera",
    description:
      "Registra una nueva carrera. Si se envía usuId, se vincula automáticamente al coordinador.",
  })
  @ApiResponse({ status: 201, description: "Carrera creada exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createCarrera(@Body() dto: CreateCarreraDto, @Query("usuId") usuId?: string) {
    return this.service.createCarrera(dto, usuId ? parseInt(usuId) : undefined);
  }

  @Get("carreras")
  @ApiOperation({
    summary: "Listar carreras",
    description: "Obtiene todas las carreras con su escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de carreras" })
  findAllCarreras() {
    return this.service.findAllCarreras();
  }

  @Get("carreras/:id")
  @ApiOperation({
    summary: "Obtener carrera",
    description: "Obtiene una carrera por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos de la carrera" })
  @ApiResponse({ status: 404, description: "Carrera no encontrada" })
  findOneCarrera(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneCarrera(id);
  }

  @Put("carreras/:id")
  @ApiOperation({
    summary: "Actualizar carrera",
    description: "Actualiza los datos de una carrera",
  })
  @ApiResponse({ status: 200, description: "Carrera actualizada exitosamente" })
  updateCarrera(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateCarreraDto,
  ) {
    return this.service.updateCarrera(id, dto);
  }

  @Delete("carreras/:id")
  @ApiOperation({
    summary: "Eliminar carrera",
    description: "Desactiva una carrera",
  })
  @ApiResponse({ status: 200, description: "Carrera eliminada exitosamente" })
  deleteCarrera(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteCarrera(id);
  }

  @Get("escuelas/:escId/carreras")
  @ApiOperation({
    summary: "Carreras por escuela",
    description: "Obtiene las carreras de una escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de carreras de la escuela" })
  getCarrerasByEscuela(@Param("escId", ParseIntPipe) escId: number) {
    return this.service.getCarrerasByEscuela(escId);
  }

  // ==================== ÁREAS DE CONOCIMIENTO ====================

  @Post("areas-conocimiento")
  @ApiOperation({
    summary: "Crear área de conocimiento",
    description: "Registra una nueva área de conocimiento",
  })
  @ApiResponse({ status: 201, description: "Área creada exitosamente" })
  @ApiResponse({ status: 400, description: "El área ya existe" })
  createAreaConocimiento(@Body() dto: CreateAreaConocimientoDto) {
    return this.service.createAreaConocimiento(dto);
  }

  @Get("areas-conocimiento")
  @ApiOperation({
    summary: "Listar áreas de conocimiento",
    description: "Obtiene todas las áreas de conocimiento",
  })
  @ApiResponse({ status: 200, description: "Lista de áreas" })
  findAllAreasConocimiento() {
    return this.service.findAllAreasConocimiento();
  }

  @Get("areas-conocimiento/:id")
  @ApiOperation({
    summary: "Obtener área de conocimiento",
    description: "Obtiene un área por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del área" })
  @ApiResponse({ status: 404, description: "Área no encontrada" })
  findOneAreaConocimiento(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneAreaConocimiento(id);
  }

  @Put("areas-conocimiento/:id")
  @ApiOperation({
    summary: "Actualizar área de conocimiento",
    description: "Actualiza los datos de un área",
  })
  @ApiResponse({ status: 200, description: "Área actualizada exitosamente" })
  updateAreaConocimiento(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateAreaConocimientoDto,
  ) {
    return this.service.updateAreaConocimiento(id, dto);
  }

  @Delete("areas-conocimiento/:id")
  @ApiOperation({
    summary: "Eliminar área de conocimiento",
    description: "Desactiva un área de conocimiento",
  })
  @ApiResponse({ status: 200, description: "Área eliminada exitosamente" })
  deleteAreaConocimiento(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteAreaConocimiento(id);
  }

  // ==================== PLAN DE ESTUDIO ====================

  @Post("planes-estudio")
  @ApiOperation({
    summary: "Crear plan de estudio",
    description: "Registra un nuevo plan de estudio",
  })
  @ApiResponse({ status: 201, description: "Plan creado exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createPlanEstudio(@Body() dto: CreatePlanEstudioDto) {
    return this.service.createPlanEstudio(dto);
  }

  @Get("planes-estudio")
  @ApiOperation({
    summary: "Listar planes de estudio",
    description: "Obtiene todos los planes con su carrera y escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de planes" })
  findAllPlanesEstudio() {
    return this.service.findAllPlanesEstudio();
  }

  @Get("planes-estudio/:id")
  @ApiOperation({
    summary: "Obtener plan de estudio",
    description: "Obtiene un plan por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del plan" })
  @ApiResponse({ status: 404, description: "Plan no encontrado" })
  findOnePlanEstudio(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOnePlanEstudio(id);
  }

  @Put("planes-estudio/:id")
  @ApiOperation({
    summary: "Actualizar plan de estudio",
    description: "Actualiza los datos de un plan",
  })
  @ApiResponse({ status: 200, description: "Plan actualizado exitosamente" })
  updatePlanEstudio(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreatePlanEstudioDto,
  ) {
    return this.service.updatePlanEstudio(id, dto);
  }

  @Delete("planes-estudio/:id")
  @ApiOperation({
    summary: "Eliminar plan de estudio",
    description: "Desactiva un plan de estudio",
  })
  @ApiResponse({ status: 200, description: "Plan eliminado exitosamente" })
  deletePlanEstudio(@Param("id", ParseIntPipe) id: number) {
    return this.service.deletePlanEstudio(id);
  }

  @Get("carreras/:carId/planes-estudio")
  @ApiOperation({
    summary: "Planes por carrera",
    description: "Obtiene los planes de estudio de una carrera",
  })
  @ApiResponse({ status: 200, description: "Lista de planes de la carrera" })
  getPlanesEstudioByCarrera(@Param("carId", ParseIntPipe) carId: number) {
    return this.service.getPlanesEstudioByCarrera(carId);
  }

  // ==================== MATERIAS ====================

  @Post("materias")
  @ApiOperation({
    summary: "Crear materia",
    description: "Registra una nueva materia",
  })
  @ApiResponse({ status: 201, description: "Materia creada exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createMateria(@Body() dto: CreateMateriaDto) {
    return this.service.createMateria(dto);
  }

  @Get("materias")
  @ApiOperation({
    summary: "Listar materias",
    description: "Obtiene todas las materias con plan, área y carrera",
  })
  @ApiResponse({ status: 200, description: "Lista de materias" })
  findAllMaterias() {
    return this.service.findAllMaterias();
  }

  @Get("materias/:id")
  @ApiOperation({
    summary: "Obtener materia",
    description: "Obtiene una materia por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos de la materia" })
  @ApiResponse({ status: 404, description: "Materia no encontrada" })
  findOneMateria(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneMateria(id);
  }

  @Put("materias/:id")
  @ApiOperation({
    summary: "Actualizar materia",
    description: "Actualiza los datos de una materia",
  })
  @ApiResponse({ status: 200, description: "Materia actualizada exitosamente" })
  updateMateria(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateMateriaDto,
  ) {
    return this.service.updateMateria(id, dto);
  }

  @Delete("materias/:id")
  @ApiOperation({
    summary: "Eliminar materia",
    description: "Desactiva una materia",
  })
  @ApiResponse({ status: 200, description: "Materia eliminada exitosamente" })
  deleteMateria(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteMateria(id);
  }

  @Get("planes-estudio/:plnId/materias")
  @ApiOperation({
    summary: "Materias por plan",
    description: "Obtiene las materias de un plan de estudio",
  })
  @ApiResponse({ status: 200, description: "Lista de materias del plan" })
  getMateriasByPlan(@Param("plnId", ParseIntPipe) plnId: number) {
    return this.service.getMateriasByPlan(plnId);
  }
  // ==================== DOCENTES ====================

  @Post("docentes")
  @ApiOperation({
    summary: "Crear docente",
    description: "Registra un nuevo docente vinculado a un usuario",
  })
  @ApiResponse({ status: 201, description: "Docente creado exitosamente" })
  @ApiResponse({ status: 400, description: "El usuario ya es docente" })
  createDocente(@Body() dto: CreateDocenteDto) {
    return this.service.createDocente(dto);
  }

  @Get("docentes")
  @ApiOperation({
    summary: "Listar docentes",
    description: "Obtiene todos los docentes con datos del usuario",
  })
  @ApiResponse({ status: 200, description: "Lista de docentes" })
  findAllDocentes() {
    return this.service.findAllDocentes();
  }

  @Get("docentes/:id")
  @ApiOperation({
    summary: "Obtener docente",
    description: "Obtiene un docente por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del docente" })
  @ApiResponse({ status: 404, description: "Docente no encontrado" })
  findOneDocente(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneDocente(id);
  }

  @Put("docentes/:id")
  @ApiOperation({
    summary: "Actualizar docente",
    description: "Actualiza los datos de un docente",
  })
  @ApiResponse({ status: 200, description: "Docente actualizado exitosamente" })
  updateDocente(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateDocenteDto,
  ) {
    return this.service.updateDocente(id, dto);
  }

  @Delete("docentes/:id")
  @ApiOperation({
    summary: "Eliminar docente",
    description: "Desactiva un docente",
  })
  @ApiResponse({ status: 200, description: "Docente eliminado exitosamente" })
  deleteDocente(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteDocente(id);
  }

  // ==================== DOCENTE - ÁREA ====================

  @Post("docente-area")
  @ApiOperation({
    summary: "Asignar área a docente",
    description: "Asigna un área de conocimiento a un docente",
  })
  @ApiResponse({ status: 201, description: "Área asignada exitosamente" })
  @ApiResponse({ status: 400, description: "El docente ya tiene esa área" })
  assignDocenteArea(@Body() dto: AssignDocenteAreaDto) {
    return this.service.assignDocenteArea(dto);
  }

  @Get("docentes/:docId/areas")
  @ApiOperation({
    summary: "Áreas de un docente",
    description: "Obtiene las áreas de conocimiento de un docente",
  })
  @ApiResponse({ status: 200, description: "Lista de áreas del docente" })
  getAreasByDocente(@Param("docId", ParseIntPipe) docId: number) {
    return this.service.getAreasByDocente(docId);
  }

  // ==================== PERÍODOS ====================

  @Post("periodos")
  @ApiOperation({
    summary: "Crear período",
    description: "Registra un nuevo período académico",
  })
  @ApiResponse({ status: 201, description: "Período creado exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createPeriodo(@Body() dto: CreatePeriodoDto) {
    return this.service.createPeriodo(dto);
  }

  @Get("periodos")
  @ApiOperation({
    summary: "Listar períodos",
    description: "Obtiene todos los períodos académicos",
  })
  @ApiResponse({ status: 200, description: "Lista de períodos" })
  findAllPeriodos() {
    return this.service.findAllPeriodos();
  }

  @Get("periodos/:id")
  @ApiOperation({
    summary: "Obtener período",
    description: "Obtiene un período por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del período" })
  @ApiResponse({ status: 404, description: "Período no encontrado" })
  findOnePeriodo(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOnePeriodo(id);
  }

  @Put("periodos/:id")
  @ApiOperation({
    summary: "Actualizar período",
    description: "Actualiza los datos de un período",
  })
  @ApiResponse({ status: 200, description: "Período actualizado exitosamente" })
  updatePeriodo(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreatePeriodoDto,
  ) {
    return this.service.updatePeriodo(id, dto);
  }

  @Delete("periodos/:id")
  @ApiOperation({
    summary: "Eliminar período",
    description: "Desactiva un período",
  })
  @ApiResponse({ status: 200, description: "Período eliminado exitosamente" })
  deletePeriodo(@Param("id", ParseIntPipe) id: number) {
    return this.service.deletePeriodo(id);
  }

  // ==================== DÍAS ====================

  @Post("dias")
  @ApiOperation({
    summary: "Crear día",
    description: "Registra un nuevo día de la semana",
  })
  @ApiResponse({ status: 201, description: "Día creado exitosamente" })
  createDia(@Body() dto: CreateDiaDto) {
    return this.service.createDia(dto);
  }

  @Get("dias")
  @ApiOperation({
    summary: "Listar días",
    description: "Obtiene todos los días",
  })
  @ApiResponse({ status: 200, description: "Lista de días" })
  findAllDias() {
    return this.service.findAllDias();
  }

  // ==================== BLOQUES HORARIOS ====================

  @Post("bloques-horarios")
  @ApiOperation({
    summary: "Crear bloque horario",
    description: "Registra un nuevo bloque de horario",
  })
  @ApiResponse({ status: 201, description: "Bloque creado exitosamente" })
  createBloqueHorario(@Body() dto: CreateBloqueHorarioDto) {
    return this.service.createBloqueHorario(dto);
  }

  @Get("bloques-horarios")
  @ApiOperation({
    summary: "Listar bloques horarios",
    description: "Obtiene todos los bloques de horario",
  })
  @ApiResponse({ status: 200, description: "Lista de bloques" })
  findAllBloquesHorarios() {
    return this.service.findAllBloquesHorarios();
  }

  // ==================== PARALELOS ====================

  @Post("paralelos")
  @ApiOperation({
    summary: "Crear paralelo",
    description: "Registra un nuevo paralelo",
  })
  @ApiResponse({ status: 201, description: "Paralelo creado exitosamente" })
  @ApiResponse({ status: 400, description: "El paralelo ya existe" })
  createParalelo(@Body() dto: CreateParaleloDto) {
    return this.service.createParalelo(dto);
  }

  @Get("paralelos")
  @ApiOperation({
    summary: "Listar paralelos",
    description: "Obtiene todos los paralelos",
  })
  @ApiResponse({ status: 200, description: "Lista de paralelos" })
  findAllParalelos() {
    return this.service.findAllParalelos();
  }

  // ==================== AULAS ====================

  @Post("aulas")
  @ApiOperation({
    summary: "Crear aula",
    description: "Registra una nueva aula",
  })
  @ApiResponse({ status: 201, description: "Aula creada exitosamente" })
  @ApiResponse({ status: 400, description: "El código ya existe" })
  createAula(@Body() dto: CreateAulaDto) {
    return this.service.createAula(dto);
  }

  @Get("aulas")
  @ApiOperation({
    summary: "Listar aulas",
    description: "Obtiene todas las aulas",
  })
  @ApiResponse({ status: 200, description: "Lista de aulas" })
  findAllAulas() {
    return this.service.findAllAulas();
  }

  @Get("aulas/:id")
  @ApiOperation({
    summary: "Obtener aula",
    description: "Obtiene un aula por su ID",
  })
  @ApiResponse({ status: 200, description: "Datos del aula" })
  @ApiResponse({ status: 404, description: "Aula no encontrada" })
  findOneAula(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOneAula(id);
  }

  @Put("aulas/:id")
  @ApiOperation({
    summary: "Actualizar aula",
    description: "Actualiza los datos de un aula",
  })
  @ApiResponse({ status: 200, description: "Aula actualizada exitosamente" })
  updateAula(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateAulaDto,
  ) {
    return this.service.updateAula(id, dto);
  }

  @Delete("aulas/:id")
  @ApiOperation({ summary: "Eliminar aula", description: "Desactiva un aula" })
  @ApiResponse({ status: 200, description: "Aula eliminada exitosamente" })
  deleteAula(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteAula(id);
  }

  // ==================== COORDINADOR - CARRERA ====================

  @Post("coordinador-carrera")
  @ApiOperation({
    summary: "Asignar coordinador a carrera",
    description: "Vincula un usuario coordinador con una carrera y su escuela",
  })
  @ApiResponse({
    status: 201,
    description: "Coordinador asignado exitosamente",
  })
  @ApiResponse({
    status: 400,
    description: "El coordinador ya está asignado a esa carrera",
  })
  assignCoordinadorCarrera(@Body() dto: AssignCoordinadorCarreraDto) {
    return this.service.assignCoordinadorCarrera(dto);
  }

  @Get("coordinador/:usuId/carreras")
  @ApiOperation({
    summary: "Carreras del coordinador",
    description: "Obtiene las carreras asignadas a un coordinador",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de carreras del coordinador",
  })
  getCarrerasByCoordinador(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.service.getCarrerasByCoordinador(usuId);
  }

  @Get("coordinador/:usuId/escuela")
  @ApiOperation({
    summary: "Escuela del coordinador",
    description: "Obtiene la escuela a la que pertenece el coordinador",
  })
  @ApiResponse({ status: 200, description: "Datos de la escuela" })
  getEscuelaByCoordinador(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.service.getEscuelaByCoordinador(usuId);
  }

  @Get("coordinador/:usuId/docentes")
  @ApiOperation({
    summary: "Docentes del coordinador",
    description:
      "Obtiene los docentes vinculados a las carreras del coordinador por área de conocimiento",
  })
  @ApiResponse({ status: 200, description: "Lista de docentes" })
  getDocentesByCoordinador(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.service.getDocentesByCoordinador(usuId);
  }

  @Get("coordinador/:usuId/materias")
  @ApiOperation({
    summary: "Materias del coordinador",
    description: "Obtiene las materias de las carreras del coordinador",
  })
  @ApiResponse({ status: 200, description: "Lista de materias" })
  getMateriasByCoordinador(@Param("usuId", ParseIntPipe) usuId: number) {
    return this.service.getMateriasByCoordinador(usuId);
  }

  @Get("coordinador/:usuId/areas-conocimiento")
  @ApiOperation({
    summary: "Áreas del coordinador",
    description:
      "Obtiene las áreas de conocimiento de las carreras del coordinador",
  })
  @ApiResponse({ status: 200, description: "Lista de áreas" })
  getAreasConocimientoByCoordinador(
    @Param("usuId", ParseIntPipe) usuId: number,
  ) {
    return this.service.getAreasConocimientoByCoordinador(usuId);
  }

  // ==================== FILTRADOS POR ESCUELA ====================

  @Get("escuelas/:escId/areas-conocimiento")
  @ApiOperation({
    summary: "Áreas por escuela",
    description: "Obtiene las áreas de conocimiento de una escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de áreas de la escuela" })
  getAreasConocimientoByEscuela(@Param("escId", ParseIntPipe) escId: number) {
    return this.service.getAreasConocimientoByEscuela(escId);
  }

  @Get("escuelas/:escId/aulas")
  @ApiOperation({
    summary: "Aulas por escuela",
    description: "Obtiene las aulas de una escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de aulas de la escuela" })
  getAulasByEscuela(@Param("escId", ParseIntPipe) escId: number) {
    return this.service.getAulasByEscuela(escId);
  }

  @Get("escuelas/:escId/docentes")
  @ApiOperation({
    summary: "Docentes por escuela",
    description: "Obtiene los docentes de una escuela",
  })
  @ApiResponse({ status: 200, description: "Lista de docentes de la escuela" })
  getDocentesByEscuela(@Param("escId", ParseIntPipe) escId: number) {
    return this.service.getDocentesByEscuela(escId);
  }

  // ==================== PROGRAMACIÓN ACADÉMICA ====================

  @Post("programacion/abrir-nivel")
  @ApiOperation({
    summary: "Abrir nivel completo",
    description:
      "Abre todas las materias de un nivel para un período y paralelo",
  })
  @ApiResponse({ status: 201, description: "Nivel abierto exitosamente" })
  @ApiResponse({
    status: 404,
    description: "No se encontraron materias para ese nivel",
  })
  abrirNivel(@Body() dto: AbrirNivelDto) {
    return this.service.abrirNivel(dto);
  }

  @Post("programacion/abrir-materias")
  @ApiOperation({
    summary: "Abrir materias individuales",
    description: "Abre materias específicas para un período y paralelo",
  })
  @ApiResponse({ status: 201, description: "Materias abiertas exitosamente" })
  abrirMaterias(@Body() dto: AbrirMateriasDto) {
    return this.service.abrirMaterias(dto);
  }

  @Put("programacion/:id")
  @ApiOperation({
    summary: "Actualizar programación",
    description:
      "Asigna docente, NRC, estudiantes, laboratorio a una materia abierta",
  })
  @ApiResponse({
    status: 200,
    description: "Programación actualizada exitosamente",
  })
  @ApiResponse({ status: 404, description: "Programación no encontrada" })
  updateProgramacion(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: CreateProgramacionDto,
  ) {
    return this.service.updateProgramacion(id, dto);
  }

  @Get("programacion/periodo/:perId/carrera/:carId")
  @ApiOperation({
    summary: "Programación por período y carrera",
    description: "Obtiene toda la programación de una carrera en un período",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de la programación académica",
  })
  getProgramacionByPeriodoCarrera(
    @Param("perId", ParseIntPipe) perId: number,
    @Param("carId", ParseIntPipe) carId: number,
  ) {
    return this.service.getProgramacionByPeriodoCarrera(perId, carId);
  }

  @Get("programacion/periodo/:perId/carrera/:carId/nivel/:nivel")
  @ApiOperation({
    summary: "Programación por nivel",
    description: "Obtiene la programación de un nivel específico",
  })
  @ApiResponse({ status: 200, description: "Lista de materias del nivel" })
  getProgramacionByNivel(
    @Param("perId", ParseIntPipe) perId: number,
    @Param("carId", ParseIntPipe) carId: number,
    @Param("nivel", ParseIntPipe) nivel: number,
  ) {
    return this.service.getProgramacionByNivel(perId, carId, nivel);
  }

  @Delete("programacion/:id")
  @ApiOperation({
    summary: "Eliminar programación",
    description: "Desactiva una materia de la programación",
  })
  @ApiResponse({
    status: 200,
    description: "Programación eliminada exitosamente",
  })
  @ApiResponse({ status: 404, description: "Programación no encontrada" })
  deleteProgramacion(@Param("id", ParseIntPipe) id: number) {
    return this.service.deleteProgramacion(id);
  }
}
