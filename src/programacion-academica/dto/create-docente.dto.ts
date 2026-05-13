import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateDocenteDto {
  @ApiProperty({ description: "ID del usuario vinculado", example: 1 })
  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @IsNumber()
  usu_id: number;

  @ApiProperty({
    description: "Título de grado",
    example: "Ingeniero en Sistemas",
    required: false,
  })
  @IsOptional()
  @IsString()
  doc_titulo_grado?: string;

  @ApiProperty({
    description: "Título de posgrado",
    example: "Magíster en TI",
    required: false,
  })
  @IsOptional()
  @IsString()
  doc_titulo_posgrado?: string;

  @ApiProperty({
    description: "Tipo de contrato",
    example: "Titular",
    required: false,
  })
  @IsOptional()
  @IsString()
  doc_tipo_contrato?: string;

  @ApiProperty({ description: "Dedicación", example: "Tiempo Completo" })
  @IsNotEmpty({ message: "La dedicación es obligatoria" })
  @IsString()
  doc_dedicacion: string;

  @ApiProperty({ description: "Horas mínimas semanales", example: 16 })
  @IsNotEmpty({ message: "Las horas mínimas son obligatorias" })
  @IsNumber()
  doc_horas_minimas: number;

  @ApiProperty({ description: "Horas máximas semanales", example: 20 })
  @IsNotEmpty({ message: "Las horas máximas son obligatorias" })
  @IsNumber()
  doc_horas_maximas: number;

  @ApiProperty({ description: "Observaciones", required: false })
  @IsOptional()
  @IsString()
  doc_observaciones?: string;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  doc_estado?: boolean;
}
