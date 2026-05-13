import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignMenuRolDto {
  @ApiProperty({ description: "ID del rol", example: 1 })
  @IsNotEmpty({ message: "El ID del rol es obligatorio" })
  @IsNumber()
  rol_id: number;

  @ApiProperty({ description: "ID del menú", example: 1 })
  @IsNotEmpty({ message: "El ID del menú es obligatorio" })
  @IsNumber()
  men_id: number;
}
