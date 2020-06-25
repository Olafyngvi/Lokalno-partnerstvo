import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private vijestiService: VijestiService,
              private storage: AngularFireStorage,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private footer: FooterService,
              private navbar: NavbarService) {
              }

  ngOnInit(): void {
    this.footer.show();
    this.navbar.show();
    this.id = this.activatedRoute.snapshot.params.id;
    this.vijestiService.getVijest('vijesti', this.id).subscribe(vijest => {
      this.vijest = vijest;
      const ref = this.storage.ref(`Vijesti/${this.vijest.Podnaslov}`);
      this.vijest.Slika = ref.getDownloadURL();
    });
  }
  loadOnce() {
    window.location.reload();
  }
}
