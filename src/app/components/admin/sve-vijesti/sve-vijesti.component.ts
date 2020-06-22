import { Component, OnInit } from '@angular/core';

import { VijestiService } from '../../../services/vijesti.service';
import { KategorijeVijestiService } from '../../../services/kategorije-vijesti.service';

import { Vijest } from '../../../models/Vijest';
import { KategorijaVijesti } from 'src/app/models/KategorijaVijesti';

@Component({
  selector: 'app-sve-vijesti',
  templateUrl: './sve-vijesti.component.html',
  styleUrls: ['./sve-vijesti.component.css']
})
export class SveVijestiComponent implements OnInit {
  pretraga = '';
  selected: 'Sve vijesti';
  filter: Vijest[] = [];
  vijesti: Vijest[];
  kategorije: KategorijaVijesti[];
  constructor(private vijestiService: VijestiService,
              private kategorijeService: KategorijeVijestiService) { }

  ngOnInit(): void {
    this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
    });
    this.kategorijeService.getKategorijeVijesti().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }
  onDeleteClick(Id: string) {
  }
  onChange() {
    this.vijestiService.getByKategorija(this.selected).subscribe(vijesti => {
      this.vijesti = vijesti;
    });
  }
  pretrazi() {
    if (this.pretraga === '') {this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
    }); }
    console.log(this.pretraga);
    this.filter = this.vijesti.filter((vijest: Vijest) => vijest.Naslov.includes(this.pretraga));
    this.vijesti = this.filter;
  }
}
