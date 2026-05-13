import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateEscuelaDto {
  @ApiProperty({ description: "Código de la escuela", example: "EHC" })
  @IsNotEmpty({ message: "El código es obligatorio" })
  @IsString()
  esc_codigo: string;

  @ApiProperty({
    description: "Nombre de la escuela",
    example: "Escuela de Hábitat, Infraestructura y Creatividad",
  })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  esc_nombre: string;

  @ApiProperty({ description: "Descripción de la escuela", required: false })
  @IsOptional()
  @IsString()
  esc_descripcion?: string;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  esc_estado?: boolean;
}
