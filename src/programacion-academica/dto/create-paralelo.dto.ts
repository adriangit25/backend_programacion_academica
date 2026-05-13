import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";

export class CreateParaleloDto {
  @ApiProperty({ description: "Nombre del paralelo", example: "A" })
  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString()
  par_nombre: string;

  @ApiProperty({
    description: "Descripción",
    example: "Paralelo A",
    required: false,
  })
  @IsOptional()
  @IsString()
  par_descripcion?: string;

  @ApiProperty({ description: "Estado", example: true, required: false })
  @IsOptional()
  @IsBoolean()
  par_estado?: boolean;
}
