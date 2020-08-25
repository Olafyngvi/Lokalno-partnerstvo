import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Meta } from '@angular/platform-browser';

import { DogadjajiService } from '../../services/dogadjaji.service';
import { NavbarService } from '../../services/navbar.service';
import { FooterService } from '../../services/footer.service';

import { Dogadjaj } from '../../models/Dogadjaj';

@Component({
  selector: 'app-dogadjaj',
  templateUrl: './dogadjaj.component.html',
  styleUrls: ['./dogadjaj.component.css']
})
export class DogadjajComponent implements OnInit {
  id: any;
  dogadjaj: Dogadjaj;
  constructor(private dogadjajiService: DogadjajiService,
              private route: ActivatedRoute,
              private storage: AngularFireStorage,
              private navbar: NavbarService,
              private footer: FooterService,
              private meta: Meta) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.navbar.show();
    this.footer.show();
    this.id = this.route.snapshot.params.id;
    // tslint:disable-next-line: deprecation
    this.dogadjajiService.getDogadjaj(this.id).subscribe(dogadjaj => {
      this.dogadjaj = dogadjaj;
      const ref = this.storage.ref(`Dogadjaji/${dogadjaj.Naslov}`);
      this.dogadjaj.Slika = ref.getDownloadURL();
      this.storage.ref('Dogadjaji/' + this.dogadjaj.Naslov).getDownloadURL().subscribe(slik => {
        this.meta.addTags([
          { property: 'og:image', content: slik},
          { property: 'og:url', content: `http://localhost:4200/dogadjaj/${this.dogadjaj.Id}`},
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: this.dogadjaj.Naslov},
          { property: 'og:description', content: jQuery(this.dogadjaj.Opis).text()}
        ]);
    });
      // tslint:disable-next-line: max-line-length
      document.getElementById('shareFB').setAttribute('data-href', encodeURIComponent(document.URL));
      // tslint:disable-next-line: max-line-length
      document.getElementById('shareFBLink').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL));
    });
  }
}
