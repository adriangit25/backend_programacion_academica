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
    description:
      "IDs de los días permitidos (ej: [1,2,3,4,5] para lunes a viernes)",
    example: [1, 2, 3, 4, 5],
  })
  @IsNotEmpty()
  @IsArray()
  dias_permitidos: number[];

  @ApiProperty({
    description: "Hora de inicio mínima (ej: 7 para 07:00)",
    example: 7,
  })
  @IsNotEmpty()
  @IsNumber()
  hora_inicio: number;

  @ApiProperty({
    description: "Hora de fin máxima (ej: 13 para 13:00)",
    example: 13,
  })
  @IsNotEmpty()
  @IsNumber()
  hora_fin: number;

  @ApiProperty({
    description: "Duración mínima de cada bloque en horas",
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  duracion_min: number;

  @ApiProperty({
    description: "Duración máxima de cada bloque en horas",
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  duracion_max: number;
}
