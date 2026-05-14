import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateAulaDto {
  @ApiProperty({ description: "Código del aula", example: "LAB-01" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  aul_codigo: string;

  @ApiProperty({
    description: "Nombre del aula",
    example: "Laboratorio de Computación 1",
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  aul_nombre: string;

  @ApiProperty({ description: "Capacidad", example: 30 })
  @IsNotEmpty({ message: "La capacidad es obligatoria" })
  @IsNumber()
  aul_capacidad: number;

  @ApiProperty({
    description: "Tipo de aula",
    example: "Laboratorio",
    required: false,
  })
  @IsOptional()
  @IsString()
  aul_tipo?: string;

  @ApiProperty({ description: "ID de la escuela", example: 1 })
  @IsNotEmpty({ message: "La escuela es obligatoria" })
  @IsNumber()
  esc_id: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  aul_estado?: boolean;
}
