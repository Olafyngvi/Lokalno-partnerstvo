import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { KursService } from '../../services/kurs.service';
import { PrakticnaObukaService } from '../../services/prakticna-obuka.service';
import { DogadjajiService } from '../../services/dogadjaji.service';

import { Kurs } from 'src/app/models/Kurs';
import { Prakticne } from 'src/app/models/Prakticne';
import { Dogadjaj } from 'src/app/models/Dogadjaj';

@Component({
  selector: 'app-usluge',
  templateUrl: './usluge.component.html',
  styleUrls: ['./usluge.component.css']
})
export class UslugeComponent implements OnInit {
  kursevi: Kurs[];
  obuke: Prakticne[];
  dogadjaji: Dogadjaj[];

  constructor(private kursService: KursService,
              private obukeService: PrakticnaObukaService,
              private dogadjajiService: DogadjajiService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.kursService.sviKursevi().subscribe(kursevi => {
      this.kursevi = kursevi;
      this.kursevi.forEach(cur => {
        const ref = this.storage.ref(`Kursevi/${cur.Naslov}`);
        cur.Slika = ref.getDownloadURL();
      });
    });
    this.obukeService.sveObuke().subscribe(obuke => {
      this.obuke = obuke;
      this.obuke.forEach(cur => {
        const ref = this.storage.ref(`Obuke/${cur.Naslov}`);
        cur.Slika = ref.getDownloadURL();
      });
    });
    this.dogadjajiService.sviDogadjaji().subscribe(dogadjaji => {
      this.dogadjaji = dogadjaji;
      this.dogadjaji.forEach(cur => {
        const ref = this.storage.ref(`Dogadjaji/${cur.Naslov}`);
        cur.Slika = ref.getDownloadURL();
      });
    });
  }
}
