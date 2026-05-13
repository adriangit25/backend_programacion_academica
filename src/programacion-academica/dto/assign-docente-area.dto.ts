import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignDocenteAreaDto {
  @ApiProperty({ description: "ID del docente", example: 1 })
  @IsNotEmpty({ message: "El ID del docente es obligatorio" })
  @IsNumber()
  doc_id: number;

  @ApiProperty({ description: "ID del área de conocimiento", example: 1 })
  @IsNotEmpty({ message: "El ID del área es obligatorio" })
  @IsNumber()
  arc_id: number;
}
