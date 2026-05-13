import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreatePeriodoDto {
  @ApiProperty({ description: "Código del período", example: "2026-01" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  per_codigo: string;

  @ApiProperty({
    description: "Nombre del período",
    example: "Marzo - Julio 2026",
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  per_nombre: string;

  @ApiProperty({ description: "Fecha de inicio", example: "2026-03-23" })
  @IsNotEmpty({ message: "La fecha de inicio es obligatoria" })
  @IsString()
  per_fecha_inicio: string;

  @ApiProperty({ description: "Fecha de fin", example: "2026-07-11" })
  @IsNotEmpty({ message: "La fecha de fin es obligatoria" })
  @IsString()
  per_fecha_fin: string;

  @ApiProperty({
    description: "Número de semanas",
    example: 16,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  per_semanas?: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  per_estado?: boolean;
}
