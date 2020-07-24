import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';

import { KursService } from '../../services/kurs.service';
import { PrakticnaObukaService } from '../../services/prakticna-obuka.service';
import { FooterService } from '../../services/footer.service';
import { NavbarService } from '../../services/navbar.service';

import { Kurs } from '../../models/Kurs';
import { Prakticne } from '../../models/Prakticne';

@Component({
  selector: 'app-kurs',
  templateUrl: './kurs.component.html',
  styleUrls: ['./kurs.component.css']
})
export class KursComponent implements OnInit {
  bool: any;
  id: string;
  obuka: Prakticne;
  kurs: Kurs;
  constructor(private kursService: KursService,
              private footerService: FooterService,
              private navbarService: NavbarService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute,
              private obukeService: PrakticnaObukaService) { }

  ngOnInit(): void {
    this.footerService.show();
    this.navbarService.show();

    // provjera da li je pozvano sa obuke
    this.bool = this.route.snapshot.params.p;
    this.id = this.route.snapshot.params.id;
    if (this.bool === 'true') {
      this.obukeService.getObuka(this.id).subscribe(obuka => {
        this.kurs = obuka;
        const ref = this.storage.ref(`Obuke/${this.kurs.Naslov}`);
        this.kurs.Slika = ref.getDownloadURL();
      });
    } else {
      this.kursService.getKurs(this.id).subscribe(kurs => {
        this.kurs = kurs;
        const ref = this.storage.ref(`Kursevi/${this.kurs.Naslov}`);
        this.kurs.Slika = ref.getDownloadURL();
      });
    }
  }
  loadOnce() {
    window.location.reload();
  }
}
