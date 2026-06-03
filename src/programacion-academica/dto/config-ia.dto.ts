import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber, IsArray } from "class-validator";

export class ConfigIADto {
  @ApiProperty({ description: "ID del período académico", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  per_id: number;

  @ApiProperty({ description: "ID de la carrera", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @ApiProperty({ description: "ID de la escuela", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  esc_id: number;

  @ApiProperty({ description: "Nivel a generar", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nivel: number;

  @ApiProperty({ description: "ID del paralelo", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  par_id: number;

  @ApiProperty({
    description: "IDs de los días permitidos",
    example: [1, 2, 3, 4, 5],
  })
  @IsNotEmpty()
  @IsArray()
  dias_permitidos: number[];

  @ApiProperty({ description: "Hora de inicio mínima", example: 7 })
  @IsNotEmpty()
  @IsNumber()
  hora_inicio: number;

  @ApiProperty({ description: "Hora de fin máxima", example: 13 })
  @IsNotEmpty()
  @IsNumber()
  hora_fin: number;

  @ApiProperty({ description: "Duración mínima de cada bloque", example: 2 })
  @IsNotEmpty()
  @IsNumber()
  duracion_min: number;

  @ApiProperty({ description: "Duración máxima de cada bloque", example: 3 })
  @IsNotEmpty()
  @IsNumber()
  duracion_max: number;

  @ApiProperty({
    description: "IDs de los laboratorios disponibles para que la IA sugiera",
    example: [5, 8, 12, 15],
    required: false,
  })
  @IsOptional()
  @IsArray()
  laboratorios_disponibles?: number[];

  @ApiProperty({
    description:
      "Horarios ya generados de otros niveles (sin confirmar) para evitar cruces de laboratorio",
    required: false,
  })
  @IsOptional()
  @IsArray()
  horarios_previos?: any[];
}
