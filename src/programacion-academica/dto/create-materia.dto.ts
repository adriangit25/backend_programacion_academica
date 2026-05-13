import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateMateriaDto {
  @ApiProperty({ description: "Código de la materia", example: "TI-401" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  mat_codigo: string;

  @ApiProperty({
    description: "Nombre de la materia",
    example: "Programación Orientada a Objetos",
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  mat_nombre: string;

  @ApiProperty({ description: "Descripción", required: false })
  @IsOptional()
  @IsString()
  mat_descripcion?: string;

  @ApiProperty({ description: "Nivel/Semestre", example: 4 })
  @IsNotEmpty({ message: "El nivel es obligatorio" })
  @IsNumber()
  mat_nivel: number;

  @ApiProperty({ description: "Horas de docencia semanales", example: 4 })
  @IsNotEmpty({ message: "Las horas de docencia son obligatorias" })
  @IsNumber()
  mat_horas_docencia: number;

  @ApiProperty({ description: "Horas prácticas", example: 2, required: false })
  @IsOptional()
  @IsNumber()
  mat_horas_practicas?: number;

  @ApiProperty({ description: "Horas autónomas", example: 3, required: false })
  @IsOptional()
  @IsNumber()
  mat_horas_autonomas?: number;

  @ApiProperty({ description: "Total de horas", example: 9 })
  @IsNotEmpty({ message: "El total de horas es obligatorio" })
  @IsNumber()
  mat_total_horas: number;

  @ApiProperty({
    description: "Estudiantes estimados",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  mat_estudiantes_estimado?: number;

  @ApiProperty({ description: "ID del plan de estudio", example: 1 })
  @IsNotEmpty({ message: "El plan de estudio es obligatorio" })
  @IsNumber()
  pln_id: number;

  @ApiProperty({ description: "ID del área de conocimiento", example: 1 })
  @IsNotEmpty({ message: "El área de conocimiento es obligatoria" })
  @IsNumber()
  arc_id: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  mat_estado?: boolean;
}
