import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AbrirNivelDto {
  @ApiProperty({ description: "ID del período académico", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  per_id: number;

  @ApiProperty({ description: "ID de la carrera", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  car_id: number;

  @ApiProperty({ description: "ID del plan de estudio", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  pln_id: number;

  @ApiProperty({ description: "Nivel/Semestre a abrir", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nivel: number;

  @ApiProperty({ description: "ID del paralelo", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  par_id: number;
}
