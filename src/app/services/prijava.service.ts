import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import { Prijava } from '../models/Prijava';

@Injectable({
  providedIn: 'root'
})
export class PrijavaService {
  prijaveCollection: AngularFirestoreCollection<Prijava>;
  prijavaDoc: AngularFirestoreDocument<Prijava>;
  prijave: Observable<Prijava[]>;
  prijava: Observable<Prijava>;
  novaPrijava: Prijava;
  constructor(private afs: AngularFirestore,
              private auth: AngularFireAuth) { }

  getPrijave(): Observable<Prijava[]> {
    const user = this.auth.auth.currentUser.displayName;
    // tslint:disable-next-line: max-line-length
    const collection: AngularFirestoreCollection<Prijava> = this.afs.collection('prijave', ref => ref.orderBy('DatumPrijave', 'desc').where('Objava', '==', user));
    const collection$: Observable<Prijava[]> = collection.snapshotChanges().pipe(
        map(actions => {
            return actions.map(action  => {
        const data = action.payload.doc.data() as Prijava;
        data.Id = action.payload.doc.id;
        return data;
          });
        })
      );
    return collection$;
  }
  getPrijava(id: string): Observable<Prijava> {
    this.prijavaDoc = this.afs.doc<Prijava>(`prijave/${id}`);
    this.prijava = this.prijavaDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
        const data = action.payload.data() as Prijava;
        data.Id = action.payload.id;
        return data;
        }
      })
    );
    return this.prijava;
  }
  getByDogadjaj(dogadjaj: string): Observable<Prijava[]> {
    let collection: AngularFirestoreCollection<Prijava>;
    if (dogadjaj !== 'Svi događaji') {
      // tslint:disable-next-line: max-line-length
      collection = this.afs.collection('prijave', ref => ref.where('EventNaziv', '==', dogadjaj));
    } else {
      collection = this.afs.collection('prijave');
    }
    const collection$: Observable<Prijava[]> = collection.snapshotChanges().pipe(
      map(actions => {
          return actions.map(action  => {
      const data = action.payload.doc.data() as Prijava;
      data.Id = action.payload.doc.id;
      return data;
        });
      })
    );
    return collection$;
  }
updatePrijava(id: string, prijava: Prijava) {
  this.prijavaDoc = this.afs.doc<Prijava>(`prijave/${id}`);

  this.novaPrijava = {
    Ime: prijava.Ime,
    Prezime: prijava.Prezime,
    DatumRodjenja: prijava.DatumRodjenja,
    DatumPrijave: prijava.DatumPrijave,
    Adresa: prijava.Adresa,
    JMBG: prijava.JMBG,
    Email: prijava.Email,
    Telefon: prijava.Telefon,
    Zanimanje: prijava.Zanimanje,
    Znanje: prijava.Znanje,
    EventId: prijava.EventId,
    Objava: prijava.Objava
  };
  this.prijavaDoc.update(this.novaPrijava).catch(err => {
    console.log(err);
  });
}
dodajPrijavu(prijava: Prijava) {
  const collection: AngularFirestoreCollection<Prijava> = this.afs.collection('prijave');
  collection.add(prijava);
}
deletePrijava(prijava: Prijava) {
  this.prijavaDoc = this.afs.doc<Prijava>(`prijave/${prijava.Id}`);
  this.prijavaDoc.delete();
}
}
