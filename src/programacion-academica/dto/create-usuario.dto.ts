import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateUsuarioDto {
  @ApiProperty({
    description: "Cédula o identificación",
    example: "1004123456",
  })
  @IsNotEmpty({ message: "La identificación es obligatoria" })
  @IsString()
  usu_identificacion: string;

  @ApiProperty({ description: "Nombres del usuario", example: "Adrian Renato" })
  @IsNotEmpty({ message: "Los nombres son obligatorios" })
  @IsString()
  usu_nombres: string;

  @ApiProperty({
    description: "Apellidos del usuario",
    example: "Hermosa Ponce",
  })
  @IsNotEmpty({ message: "Los apellidos son obligatorios" })
  @IsString()
  usu_apellidos: string;

  @ApiProperty({ description: "Nombre de usuario", example: "ahermosa" })
  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @IsString()
  usu_usuario: string;

  @ApiProperty({ description: "Contraseña", example: "123456" })
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString()
  usu_contrasenia: string;

  @ApiProperty({
    description: "Estado del usuario",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  usu_estado?: boolean;
}
