import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { KategorijeVijestiService } from '../../../services/kategorije-vijesti.service';
import { KategorijaVijesti } from '../../../models/KategorijaVijesti';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-kategorije-vijesti-izmjena',
  templateUrl: './kategorije-vijesti-izmjena.component.html',
  styleUrls: ['./kategorije-vijesti-izmjena.component.css']
})
export class KategorijeVijestiIzmjenaComponent implements OnInit {
  id: string;
  category: string;
  kategorija: KategorijaVijesti = {
    Naziv: ''
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private kateforije: KategorijeVijestiService,
              private fm: FlashMessagesService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.kateforije.getKategorijaVijesti(this.id).subscribe(kategorija => {
      this.kategorija = kategorija;
    });
  }
  onSubmit({value, valid}: {value: KategorijaVijesti, valid: boolean}) {
    if (!valid) {
      console.log(valid);
    } else {
        this.kateforije.updateKategorijaVijesti(value, this.id);
        this.fm.show('Kategorija je uspješno izmijenjena', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate([`/dashboard/kategorije-vijesti`]);
    }
  }
}
