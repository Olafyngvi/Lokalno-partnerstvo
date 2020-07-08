import { Component, OnInit } from '@angular/core';

import { VijestiService } from 'src/app/services/vijesti.service';
import { KursService } from '../../../services/kurs.service';
import { PrakticnaObukaService } from '../../../services/prakticna-obuka.service';
import { DogadjajiService } from '../../../services/dogadjaji.service';

import { Kurs } from '../../../models/Kurs';
import { Vijest } from 'src/app/models/Vijest';
import { Prakticne } from 'src/app/models/Prakticne';
import { Dogadjaj } from 'src/app/models/Dogadjaj';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  brojDogadjaja: any;
  dogadjaji: Dogadjaj[];
  brojObuka: any;
  obuke: Prakticne[];
  brojKurseva: any;
  kursevi: Kurs[];
  brojVijesti: any;
  vijesti: Vijest[];
  constructor(private vijestiService: VijestiService,
              private kursService: KursService,
              private obukeService: PrakticnaObukaService,
              private dogadjajiService: DogadjajiService) { }

  ngOnInit(): void {
    this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
      this.brojVijesti = vijesti.length;
    });
    this.kursService.getKursevi().subscribe(kursevi => {
      this.kursevi = kursevi;
      this.brojKurseva = kursevi.length;
    });
    this.obukeService.getObuke().subscribe(obuke => {
      this.obuke = obuke;
      this.brojObuka = obuke.length;
    });
    this.dogadjajiService.getDogadjaji().subscribe(dogadjaji => {
      this.dogadjaji = dogadjaji;
      this.brojDogadjaja = dogadjaji.length;
    })
  }

}
