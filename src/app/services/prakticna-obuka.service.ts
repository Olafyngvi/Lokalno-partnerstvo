import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import { MyImageService } from '../services/my-image.service';

import { Prakticne } from '../models/Prakticne';

@Injectable({
  providedIn: 'root'
})
export class PrakticnaObukaService {
  obukeCollection: AngularFirestoreCollection<Prakticne>;
  obukaDoc: AngularFirestoreDocument<Prakticne>;
  obuke: Observable<Prakticne[]>;
  obuka: Observable<Prakticne>;
  novaObuka: Prakticne;
  constructor(private afs: AngularFirestore,
              private imageService: MyImageService) { }

  getObuke(): Observable<Prakticne[]> {
    // tslint:disable-next-line: max-line-length
    const collection: AngularFirestoreCollection<Prakticne> = this.afs.collection('prakticneObuke', ref => ref.orderBy('DatumObjave', 'desc'));
    const collection$: Observable<Prakticne[]> = collection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action  => {
        const data = action.payload.doc.data() as Prakticne;
        data.Id = action.payload.doc.id;
        return data;
          });
        })
      );
    return collection$;
}
getObuka(id: string): Observable<Prakticne> {
  this.obukaDoc = this.afs.doc<Prakticne>(`prakticneObuke/${id}`);
  this.obuka = this.obukaDoc.snapshotChanges().pipe(
    map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Prakticne;
        data.Id = action.payload.id;
        return data;
      }
    })
  );
  return this.obuka;
}
getByKategorija(kategorija: string): Observable<Prakticne[]> {
  let collection: AngularFirestoreCollection<Prakticne>;
  if (kategorija !== 'Sve praktične obuke') {
    // tslint:disable-next-line: max-line-length
     collection = this.afs.collection('prakticneObuke', ref => ref.where('Kategorija', '==', kategorija));
  } else {
    collection = this.afs.collection('prakticneObuke');
  }
  const collection$: Observable<Prakticne[]> = collection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(action  => {
      const data = action.payload.doc.data() as Prakticne;
      data.Id = action.payload.doc.id;
      return data;
        });
      })
    );
  return collection$;
}
updateKategorija(obuka: Prakticne, kategorija: string) {
  obuka.Kategorija = kategorija;
  this.updateObuka(obuka.Id, obuka);

}
updateObuka(id: string, obuka: Prakticne) {
  this.obukaDoc = this.afs.doc<Prakticne>(`prakticneObuke/${id}`);

  this.novaObuka = {
    Naslov: obuka.Naslov,
    Opis: obuka.Opis,
    Trajanje: obuka.Trajanje,
    Kategorija: obuka.Kategorija,
    DatumObjave: obuka.DatumObjave,
    DatumPocetka: obuka.DatumPocetka,
    Cijena: obuka.Cijena,
    BrojPolaznika: obuka.BrojPolaznika
  };
  this.obukaDoc.update(this.novaObuka).catch(err => {
    console.log(err);
  });
}
dodajObuku(obuka: Prakticne) {
  const collection: AngularFirestoreCollection<Prakticne> = this.afs.collection('prakticneObuke');
  collection.add(obuka);
}
deleteObuka(obuka: Prakticne) {
  this.obukaDoc = this.afs.doc<Prakticne>(`prakticneObuke/${obuka.Id}`);
  this.obukaDoc.delete();
  this.imageService.deleteImage(obuka.Naslov, 'Obuke');
}
}
