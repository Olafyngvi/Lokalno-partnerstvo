import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PrijavaService } from '../../../services/prijava.service';

import { Prijava } from '../../../models/Prijava';

@Component({
  selector: 'app-prijave',
  templateUrl: './prijave.component.html',
  styleUrls: ['./prijave.component.css']
})
export class PrijaveComponent implements OnInit {
  naziv: string;
  pretraga: string;
  selectedObj = 'Svi događaji';
  events: string[] = [];
  filter: Prijava[];
  prijave: Prijava[];

  constructor(private prijavaService: PrijavaService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.naziv = this.route.snapshot.params.p;
    if (this.naziv !== undefined) {
      this.prijavaService.getByDogadjaj(this.naziv).subscribe(prijave => {
        this.prijave = prijave;
        this.selectedObj = this.naziv;
        this.prijave.forEach(doc => {
          this.events.unshift(doc.EventNaziv);
          this.events = Array.from(new Set(this.events));
        });
      });
    } else {
      this.prijavaService.getPrijave().subscribe(prijave => {
        this.prijave = prijave;
        this.prijave.forEach(doc => {
          this.events.unshift(doc.EventNaziv);
          this.events = Array.from(new Set(this.events));
        });
      });
    }
  }
  delete(prijava: Prijava) {}
  onChange() {
    this.prijavaService.getByDogadjaj(this.selectedObj).subscribe(prijave => {
      this.prijave = prijave;
      this.prijave.forEach(doc => {
        this.events.unshift(doc.EventNaziv);
        this.events = Array.from(new Set(this.events));
      });
    });
    this.pretraga = '';
  }
  pretrazi() {
    if (this.pretraga === '') {this.prijavaService.getPrijave().subscribe(prijave => {
      this.prijave = prijave;
      this.events = [];
      this.prijave.forEach(doc => {
        this.events.unshift(doc.EventNaziv);
        this.events = Array.from(new Set(this.events));
      });
    }); } else {
      this.prijavaService.getPrijave().subscribe(prijave => {
        this.prijave = prijave;
        // tslint:disable-next-line: max-line-length
        this.filter = this.prijave.filter((prijava: Prijava) =>
          // tslint:disable-next-line: max-line-length
          prijava.Ime.toLowerCase().includes(this.pretraga.toLowerCase()) || prijava.Prezime.toLowerCase().includes(this.pretraga.toLowerCase()) );
        this.prijave = this.filter;
        this.events = [];
        this.prijave.forEach(doc => {
          this.events.unshift(doc.EventNaziv);
          this.events = Array.from(new Set(this.events));
        });
      });
    }
  }
}
