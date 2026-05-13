import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateBloqueHorarioDto {
  @ApiProperty({ description: "Hora de inicio", example: "07:00" })
  @IsNotEmpty({ message: "La hora de inicio es obligatoria" })
  @IsString()
  blq_hora_inicio: string;

  @ApiProperty({ description: "Hora de fin", example: "08:00" })
  @IsNotEmpty({ message: "La hora de fin es obligatoria" })
  @IsString()
  blq_hora_fin: string;

  @ApiProperty({
    description: "Descripción",
    example: "07:00 - 08:00",
    required: false,
  })
  @IsOptional()
  @IsString()
  blq_descripcion?: string;

  @ApiProperty({ description: "Orden", example: 1 })
  @IsNotEmpty({ message: "El orden es obligatorio" })
  @IsNumber()
  blq_orden: number;
}
