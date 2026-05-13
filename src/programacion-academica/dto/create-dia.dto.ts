import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateDiaDto {
  @ApiProperty({ description: "Nombre del día", example: "Lunes" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  dia_nombre: string;

  @ApiProperty({ description: "Abreviatura", example: "LUN" })
  @IsNotEmpty({ message: "La abreviatura es obligatoria" })
  @IsString()
  dia_abreviatura: string;

  @ApiProperty({ description: "Orden del día", example: 1 })
  @IsNotEmpty({ message: "El orden es obligatorio" })
  @IsNumber()
  dia_orden: number;
}
