import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router, NavigationStart} from '@angular/router';

import { VijestiService } from '../../services/vijesti.service';
import { FooterService } from '../../services/footer.service';
import { NavbarService } from '../../services/navbar.service';

import { Vijest } from '../../models/Vijest';

@Component({
  selector: 'app-vijest',
  templateUrl: './vijest.component.html',
  styleUrls: ['./vijest.component.css']
})
export class VijestComponent implements OnInit {
  id: any;
  vijest: Vijest;
  slicno: Vijest[];
  nedavno: Vijest[];
  constructor(private vijestiService: VijestiService,
              private storage: AngularFireStorage,
              private meta: Meta,
              private activatedRoute: ActivatedRoute,
              private footer: FooterService,
              private navbar: NavbarService,
              private router: Router) {
              }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.footer.show();
    this.navbar.show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.activatedRoute.snapshot.params.id;
    this.vijestiService.getVijest('vijesti', this.id).subscribe(vijest => {
      this.vijest = vijest;
      this.vijestiService.getByKategorija(vijest.Kategorija).subscribe(slicno => {
        this.slicno = slicno;
        this.slicno.forEach(doc => {
          // tslint:disable-next-line: no-shadowed-variable
          const ref = this.storage.ref(`Vijesti/${doc.Podnaslov}`);
          doc.Slika = ref.getDownloadURL();
        });
      });
      const ref = this.storage.ref(`Vijesti/${this.vijest.Podnaslov}`);
      this.vijest.Slika = ref.getDownloadURL();
      this.storage.ref('Vijesti/' + this.vijest.Podnaslov).getDownloadURL().subscribe(slik => {
        this.meta.addTags([
          { property: 'og:image', content: slik},
          { property: 'og:url', content: `https://angular.demo.ba/vijest/${this.vijest.Id}`},
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: this.vijest.Naslov},
          { property: 'og:description', content: jQuery(this.vijest.Sadrzaj).text()}
        ]);
      });
    });
      // tslint:disable-next-line: max-line-length
    document.getElementById('shareFB').setAttribute('data-href', encodeURIComponent(document.URL));
      // tslint:disable-next-line: max-line-length
    document.getElementById('shareFBLink').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL));
    this.vijestiService.getVijesti().subscribe(nedavno => {
      this.nedavno = nedavno;
      this.nedavno.forEach(doc => {
        // tslint:disable-next-line: no-shadowed-variable
        const ref = this.storage.ref(`Vijesti/${doc.Podnaslov}`);
        doc.Slika = ref.getDownloadURL();
      });
    });
  }
  loadOnce() {
    window.location.reload();
  }
}
