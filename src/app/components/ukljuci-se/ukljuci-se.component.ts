import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { KursService } from '../../services/kurs.service';

import { Kurs } from '../../models/Kurs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ukljuci-se',
  templateUrl: './ukljuci-se.component.html',
  styleUrls: ['./ukljuci-se.component.css']
})
export class UkljuciSeComponent implements OnInit {
  kursevi: Kurs[];
  constructor(private kursService: KursService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.kursService.sviKursevi().subscribe(kursevi => {
      this.kursevi = kursevi;
      this.kursevi.forEach(doc => {
        const ref = this.storage.ref(`Kursevi/${doc.Naslov}`);
        doc.Slika = ref.getDownloadURL();
      });
    });
  }
  getUrl(slika: Observable<string>) {
  }
}
