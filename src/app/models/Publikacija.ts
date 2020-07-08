import { Observable } from 'rxjs';
export interface Publikacija {
  Id?: string;
  Naziv?: string;
  Opis?: string;
  DatumObjavljivanja?: string;
  Autor?: any;
  Slika?: Observable<any>;
  File?: any;
}
