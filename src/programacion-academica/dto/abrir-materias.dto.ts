import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class AbrirMateriasDto {
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

  @ApiProperty({
    description: "IDs de las materias a abrir",
    example: [1, 3, 5],
  })
  @IsNotEmpty()
  @IsArray()
  mat_ids: number[];

  @ApiProperty({ description: "ID del paralelo", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  par_id: number;
}
