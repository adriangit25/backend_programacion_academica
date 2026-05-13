import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateCarreraDto {
  @ApiProperty({ description: "Código de la carrera", example: "TI" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  car_codigo: string;

  @ApiProperty({
    description: "Nombre de la carrera",
    example: "Tecnologías de la Información",
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  car_nombre: string;

  @ApiProperty({
    description: "Modalidad",
    example: "Presencial",
    required: false,
  })
  @IsOptional()
  @IsString()
  car_modalidad?: string;

  @ApiProperty({ description: "Descripción", required: false })
  @IsOptional()
  @IsString()
  car_descripcion?: string;

  @ApiProperty({ description: "ID de la escuela", example: 1 })
  @IsNotEmpty({ message: "La escuela es obligatoria" })
  @IsNumber()
  esc_id: number;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  car_estado?: boolean;
}
