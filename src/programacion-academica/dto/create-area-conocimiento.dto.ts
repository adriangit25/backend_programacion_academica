import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateAreaConocimientoDto {
  @ApiProperty({ description: "Nombre del área", example: "Programación" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  arc_nombre: string;

  @ApiProperty({
    description: "Descripción del área",
    example: "Desarrollo de software, algoritmos",
    required: false,
  })
  @IsOptional()
  @IsString()
  arc_descripcion?: string;

  @ApiProperty({ description: "ID de la escuela", example: 1 })
  @IsNotEmpty({ message: "La escuela es obligatoria" })
  @IsNumber()
  esc_id: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  arc_estado?: boolean;
}
