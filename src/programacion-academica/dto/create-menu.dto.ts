import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";

export class CreateMenuDto {
  @ApiProperty({ description: "Nombre del menú", example: "Dashboard" })
  @IsNotEmpty({ message: "El nombre del menú es obligatorio" })
  @IsString()
  men_nombre: string;

  @ApiProperty({
    description: "Icono del menú",
    example: "pi pi-home",
    required: false,
  })
  @IsOptional()
  @IsString()
  men_icono?: string;

  @ApiProperty({
    description: "URL del menú",
    example: "/dashboard",
    required: false,
  })
  @IsOptional()
  @IsString()
  men_url?: string;

  @ApiProperty({ description: "Orden del menú", example: 1 })
  @IsNotEmpty({ message: "El orden es obligatorio" })
  @IsNumber()
  men_orden: number;

  @ApiProperty({
    description: "ID del menú padre (null si es raíz)",
    example: null,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  men_padre_id?: number;

  @ApiProperty({
    description: "Estado del menú",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  men_estado?: boolean;
}
