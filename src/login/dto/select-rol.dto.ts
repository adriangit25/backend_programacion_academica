import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SelectRolDto {
  @ApiProperty({ description: "ID del usuario", example: 1 })
  @IsNotEmpty({ message: "El ID del usuario es obligatorio" })
  @IsNumber()
  usu_id: number;

  @ApiProperty({ description: "ID del rol seleccionado", example: 1 })
  @IsNotEmpty({ message: "El ID del rol es obligatorio" })
  @IsNumber()
  rol_id: number;
}
