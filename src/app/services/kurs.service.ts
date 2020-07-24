import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { MyImageService } from '../services/my-image.service';

import { Kurs } from '../models/Kurs';

@Injectable({
  providedIn: 'root'
})
export class KursService {
  kurseviCollection: AngularFirestoreCollection<Kurs>;
  kursDoc: AngularFirestoreDocument<Kurs>;
  kursevi: Observable<Kurs[]>;
  kurs: Observable<Kurs>;
  noviKurs: Kurs;
  constructor(private afs: AngularFirestore,
              private imageService: MyImageService,
              private auth: AngularFireAuth) { }

    sviKursevi(): Observable<Kurs[]> {
    // tslint:disable-next-line: max-line-length
    const collection: AngularFirestoreCollection<Kurs> = this.afs.collection('kursevi', ref => ref.orderBy('DatumObjave', 'desc'));
    const collection$: Observable<Kurs[]> = collection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action  => {
        const data = action.payload.doc.data() as Kurs;
        data.Id = action.payload.doc.id;
        return data;
          });
        })
      );
    return collection$;
}
  getKursevi(): Observable<Kurs[]> {
    const user = this.auth.auth.currentUser.displayName;
    // tslint:disable-next-line: max-line-length
    const collection: AngularFirestoreCollection<Kurs> = this.afs.collection('kursevi', ref => ref.orderBy('DatumObjave', 'desc').where('Objava', '==', user));
    const collection$: Observable<Kurs[]> = collection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action  => {
        const data = action.payload.doc.data() as Kurs;
        data.Id = action.payload.doc.id;
        return data;
          });
        })
      );
    return collection$;
}
getKurs(id: string): Observable<Kurs> {
  this.kursDoc = this.afs.doc<Kurs>(`kursevi/${id}`);
  this.kurs = this.kursDoc.snapshotChanges().pipe(
    map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Kurs;
        data.Id = action.payload.id;
        return data;
      }
    })
  );
  return this.kurs;
}
getByKategorija(kategorija: string): Observable<Kurs[]> {
  let collection: AngularFirestoreCollection<Kurs>;
  if (kategorija !== 'Svi kursevi') {
    // tslint:disable-next-line: max-line-length
     collection = this.afs.collection('kursevi', ref => ref.where('Kategorija', '==', kategorija));
  } else {
    collection = this.afs.collection('kursevi');
  }
  const collection$: Observable<Kurs[]> = collection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(action  => {
      const data = action.payload.doc.data() as Kurs;
      data.Id = action.payload.doc.id;
      return data;
        });
      })
    );
  return collection$;
}
updateKategorija(kurs: Kurs, kategorija: string) {
  kurs.Kategorija = kategorija;
  this.updateKurs(kurs.Id, kurs);

}
updateKurs(id: string, kurs: Kurs) {
  this.kursDoc = this.afs.doc<Kurs>(`kursevi/${id}`);

  this.noviKurs = {
    Naslov: kurs.Naslov,
    Opis: kurs.Opis,
    Trajanje: kurs.Trajanje,
    Kategorija: kurs.Kategorija,
    DatumObjave: kurs.DatumObjave,
    DatumPocetka: kurs.DatumPocetka,
    Cijena: kurs.Cijena,
    BrojPolaznika: kurs.BrojPolaznika,
    Objava: kurs.Objava
  };
  this.kursDoc.update(this.noviKurs).catch(err => {
    console.log(err);
  });
}
dodajKurs(kurs: Kurs) {
  const user = this.auth.auth.currentUser.displayName;
  const collection: AngularFirestoreCollection<Kurs> = this.afs.collection('kursevi');
  kurs.Objava = user;
  collection.add(kurs);
}
deleteKurs(kurs: Kurs) {
  this.kursDoc = this.afs.doc<Kurs>(`kursevi/${kurs.Id}`);
  this.kursDoc.delete();
  this.imageService.deleteImage(kurs.Naslov, 'Kursevi');
}
}
