import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: "Nombre de usuario",
    example: "arhermosa",
  })
  @IsNotEmpty({ message: "El usuario es obligatorio" })
  @IsString()
  usu_usuario: string;

  @ApiProperty({
    description: "Contraseña del usuario",
    example: "123456",
  })
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  @IsString()
  usu_contrasenia: string;
}
