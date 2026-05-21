import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsBoolean,
} from "class-validator";

export class CreateProgramacionDto {
  @ApiProperty({ description: "ID del período académico", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  per_id: number;

  @ApiProperty({ description: "ID de la materia", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  mat_id: number;

  @ApiProperty({ description: "ID de la carrera", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @ApiProperty({ description: "ID del plan de estudio", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  pln_id: number;

  @ApiProperty({ description: "ID del paralelo", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  par_id: number;

  @ApiProperty({ description: "Nivel/Semestre", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  pra_nivel: number;

  @ApiProperty({ description: "ID del docente", required: false })
  @IsOptional()
  @IsNumber()
  doc_id?: number;

  @ApiProperty({ description: "ID del aula", required: false })
  @IsOptional()
  @IsNumber()
  aul_id?: number;

  @ApiProperty({ description: "NRC", example: "10745", required: false })
  @IsOptional()
  @IsString()
  pra_nrc?: string;

  @ApiProperty({
    description: "Modalidad",
    example: "Presencial",
    required: false,
  })
  @IsOptional()
  @IsString()
  pra_modalidad?: string;

  @ApiProperty({
    description: "Estudiantes estimados",
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pra_estudiantes_estimado?: number;

  @ApiProperty({
    description: "Estudiantes matriculados",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pra_estudiantes_matriculados?: number;

  @ApiProperty({ description: "Laboratorio asignado", required: false })
  @IsOptional()
  @IsString()
  pra_laboratorio?: string;

  @ApiProperty({ description: "Observaciones", required: false })
  @IsOptional()
  @IsString()
  pra_observaciones?: string;
}
