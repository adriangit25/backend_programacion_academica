import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber, IsString } from "class-validator";

export class CreateHorarioDto {
  @ApiProperty({ description: "ID de la programación académica", example: 1 })
  @IsNotEmpty({ message: "La programación es obligatoria" })
  @IsNumber()
  pra_id: number;

  @ApiProperty({ description: "ID del día", example: 1 })
  @IsNotEmpty({ message: "El día es obligatorio" })
  @IsNumber()
  dia_id: number;

  @ApiProperty({ description: "ID del bloque horario de inicio", example: 1 })
  @IsNotEmpty({ message: "El bloque de inicio es obligatorio" })
  @IsNumber()
  blq_id_inicio: number;

  @ApiProperty({ description: "ID del bloque horario de fin", example: 3 })
  @IsNotEmpty({ message: "El bloque de fin es obligatorio" })
  @IsNumber()
  blq_id_fin: number;

  @ApiProperty({ description: "ID del aula", required: false })
  @IsOptional()
  @IsNumber()
  aul_id?: number;

  @ApiProperty({ description: "Observaciones", required: false })
  @IsOptional()
  @IsString()
  hor_observaciones?: string;
}
