export class CreateBibliografiaDto {
  pra_id: number;
  bib_titulo: string;
  bib_autor?: string;
  bib_editorial?: string;
  bib_anio?: number;
  bib_tipo: "enlace" | "archivo";
  bib_enlace?: string;
}
