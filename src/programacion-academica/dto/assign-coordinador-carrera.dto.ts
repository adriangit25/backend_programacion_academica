import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class AssignCoordinadorCarreraDto {
  @ApiProperty({ description: "ID del usuario coordinador", example: 2 })
  @IsNotEmpty({ message: "El ID del usuario es obligatorio" })
  @IsNumber()
  usu_id: number;

  @ApiProperty({ description: "ID de la escuela", example: 1 })
  @IsNotEmpty({ message: "El ID de la escuela es obligatorio" })
  @IsNumber()
  esc_id: number;

  @ApiProperty({
    description: "ID de la carrera (opcional, se asigna después)",
    example: null,
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsNumber({}, { message: "El ID de la carrera debe ser un número" })
  car_id?: number | null;
}
