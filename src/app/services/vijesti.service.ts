import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

import { Vijest } from '../models/Vijest';

@Injectable({
  providedIn: 'root'
})
export class VijestiService {
  vijestiCollection: AngularFirestoreCollection<Vijest>;
  vijestDoc: AngularFirestoreDocument<Vijest>;
  vijesti: Observable<Vijest[]>;
  vijest: Observable<Vijest>;
  novaVijest: Vijest;
  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage) { }

  getProducts(): Observable<Vijest[]> {
      // tslint:disable-next-line: max-line-length
      const collection: AngularFirestoreCollection<Vijest> = this.afs.collection('vijesti');
      const collection$: Observable<Vijest[]> = collection.snapshotChanges().pipe(
          map(actions => {
              return actions.map(action  => {
          const data = action.payload.doc.data() as Vijest;
          data.id = action.payload.doc.id;
          return data;
            });
          })
        );
      return collection$;
  }

  DodajVijest(vijest: Vijest) {
    const collection: AngularFirestoreCollection<Vijest> = this.afs.collection('vijesti');
    collection.add(vijest);
  }
}