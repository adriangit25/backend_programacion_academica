import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateRolDto {
  @ApiProperty({ description: "Nombre del rol", example: "Administrador" })
  @IsNotEmpty({ message: "El nombre del rol es obligatorio" })
  @IsString()
  rol_nombre: string;

  @ApiProperty({
    description: "Descripción del rol",
    example: "Acceso total al sistema",
    required: false,
  })
  @IsOptional()
  @IsString()
  rol_descripcion?: string;

  @ApiProperty({
    description: "Estado del rol",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  rol_estado?: boolean;
}
