import { Observable } from 'rxjs';
export interface Prakticne {
  Id?: string;
  Naslov?: string;
  Opis?: string;
  Kategorija?: string;
  DatumPocetka?: any;
  DatumObjave?: any;
  Trajanje?: string;
  Cijena?: number;
  BrojPolaznika?: number;
  Slika?: Observable<any>;
  Objava: string;
  Aktivan?: boolean;
}
