import { Component, OnInit } from '@angular/core';

import { KursService } from '../../../services/kurs.service';
import { KategorijeKurseviService } from '../../../services/kategorije-kursevi.service';
import { ComfirmationDialogService } from '../../confirmation-dialog/comfirmation-dialog.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Kurs } from '../../../models/Kurs';
import { KategorijaKurs } from 'src/app/models/KategorijaKurs';

@Component({
  selector: 'app-kursevi',
  templateUrl: './kursevi.component.html',
  styleUrls: ['./kursevi.component.css']
})
export class KurseviComponent implements OnInit {
  pretraga = '';
  selected = 'Svi kursevi';
  filter: Kurs[] = [];
  kursevi: Kurs[];
  kategorije: KategorijaKurs[];
  constructor(private kursService: KursService,
              private kategorijeService: KategorijeKurseviService,
              private cds: ComfirmationDialogService,
              private fm: FlashMessagesService) { }

  ngOnInit(): void {
    this.kursService.getKursevi().subscribe(kursevi => {
      this.kursevi = kursevi;
    });
    this.kategorijeService.getKategorijeKursevi().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }
  onChange() {
    this.kursService.getByKategorija(this.selected).subscribe(kursevi => {
      this.kursevi = kursevi;
    });
  }
  pretrazi() {
    if (this.pretraga === '') {this.kursService.getKursevi().subscribe(kursevi => {
      this.kursevi = kursevi;
    }); } else {
      this.kursService.getKursevi().subscribe(kursevi => {
        this.kursevi = kursevi;
        this.filter = this.kursevi.filter((kurs: Kurs) => kurs.Naslov.toLowerCase().includes(this.pretraga.toLowerCase()));
        this.kursevi = this.filter;
      });
    }
  }
  onDeleteClick(kurs: Kurs) {
    this.cds.confirm('Pažnja', `Jeste li sigurni da želite obrisati kurs ${kurs.Naslov} ?`)
    .then(confirmed => {
      if (confirmed === false) {
        this.fm.show('Kurs je uspješno obrisan', {cssClass: 'alert-success', timeout: 3000});
        this.kursService.deleteKurs(kurs);
      }
    });
  }
}
