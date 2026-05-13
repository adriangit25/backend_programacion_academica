import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

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

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  arc_estado?: boolean;
}
