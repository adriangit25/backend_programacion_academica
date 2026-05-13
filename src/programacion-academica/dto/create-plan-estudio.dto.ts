import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreatePlanEstudioDto {
  @ApiProperty({ description: "Código del plan", example: "PEN-2020" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  pln_codigo: string;

  @ApiProperty({ description: "Nombre del plan", example: "Pensum 2020" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  pln_nombre: string;

  @ApiProperty({ description: "Año del plan", example: 2020 })
  @IsNotEmpty({ message: "El año es obligatorio" })
  @IsNumber()
  pln_anio: number;

  @ApiProperty({ description: "Descripción", required: false })
  @IsOptional()
  @IsString()
  pln_descripcion?: string;

  @ApiProperty({ description: "ID de la carrera", example: 1 })
  @IsNotEmpty({ message: "La carrera es obligatoria" })
  @IsNumber()
  car_id: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  pln_estado?: boolean;
}
