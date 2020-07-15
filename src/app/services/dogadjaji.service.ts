import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MyImageService } from '../services/my-image.service';

import { Dogadjaj } from '../models/Dogadjaj';

@Injectable({
  providedIn: 'root'
})
export class DogadjajiService {
  dogadjajiCollection: AngularFirestoreCollection<Dogadjaj>;
  dogadjajDoc: AngularFirestoreDocument<Dogadjaj>;
  dogadjaji: Observable<Dogadjaj[]>;
  dogadjaj: Observable<Dogadjaj>;
  noviDogadjaj: Dogadjaj;
  constructor(private afs: AngularFirestore,
              private imageService: MyImageService) { }

  getDogadjaji(): Observable<Dogadjaj[]> {
    // tslint:disable-next-line: max-line-length
    const collection: AngularFirestoreCollection<Dogadjaj> = this.afs.collection('dogadjaji', ref => ref.orderBy('DatumObjave', 'desc'));
    const collection$: Observable<Dogadjaj[]> = collection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action  => {
        const data = action.payload.doc.data() as Dogadjaj;
        data.Id = action.payload.doc.id;
        return data;
          });
        })
      );
    return collection$;
}
getDogadjaj(id: string): Observable<Dogadjaj> {
  this.dogadjajDoc = this.afs.doc<Dogadjaj>(`dogadjaji/${id}`);
  this.dogadjaj = this.dogadjajDoc.snapshotChanges().pipe(
    map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Dogadjaj;
        data.Id = action.payload.id;
        return data;
      }
    })
  );
  return this.dogadjaj;
}
getByKategorija(kategorija: string): Observable<Dogadjaj[]> {
  let collection: AngularFirestoreCollection<Dogadjaj>;
  if (kategorija !== 'Svi događaji') {
    // tslint:disable-next-line: max-line-length
     collection = this.afs.collection('dogadjaji', ref => ref.where('Kategorija', '==', kategorija));
  } else {
    collection = this.afs.collection('dogadjaji');
  }
  const collection$: Observable<Dogadjaj[]> = collection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(action  => {
      const data = action.payload.doc.data() as Dogadjaj;
      data.Id = action.payload.doc.id;
      return data;
        });
      })
    );
  return collection$;
}
updateKategorija(dogadjaj: Dogadjaj, kategorija: string) {
  dogadjaj.Kategorija = kategorija;
  this.updateDogadjaj(dogadjaj.Id, dogadjaj);

}
updateDogadjaj(id: string, dogadjaj: Dogadjaj) {
  this.dogadjajDoc = this.afs.doc<Dogadjaj>(`dogadjaji/${id}`);

  this.noviDogadjaj = {
    Naslov: dogadjaj.Naslov,
    Opis: dogadjaj.Opis,
    Kategorija: dogadjaj.Kategorija,
    DatumObjave: dogadjaj.DatumObjave,
    DatumPocetka: dogadjaj.DatumPocetka,
    VrijemePocetka: dogadjaj.VrijemePocetka
  };
  this.dogadjajDoc.update(this.noviDogadjaj).catch(err => {
    console.log(err);
  });
}
dodajDogadjaj(dogadjaj: Dogadjaj) {
  const collection: AngularFirestoreCollection<Dogadjaj> = this.afs.collection('dogadjaji');
  collection.add(dogadjaj);
}
deleteDogadjaj(dogadjaj: Dogadjaj) {
  this.dogadjajDoc = this.afs.doc<Dogadjaj>(`dogadjaji/${dogadjaj.Id}`);
  this.dogadjajDoc.delete();
  this.imageService.deleteImage(dogadjaj.Naslov, 'Dogadjaji');
}
}