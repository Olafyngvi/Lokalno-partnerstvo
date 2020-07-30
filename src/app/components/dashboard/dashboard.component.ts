import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService } from '../../services/navbar.service';
import { FooterService } from '../../services/footer.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { PrijavaService } from '../../services/prijava.service';
import { VijestiService } from '../../services/vijesti.service';

import { Vijest } from 'src/app/models/Vijest';
import { Prijava } from '../../models/Prijava';
import { User } from '../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prijave: Prijava[];
  broj: number;
  user: any;
  email: string;
  name: string;
  constructor(public nav: NavbarService,
              public footer: FooterService,
              private auth: AuthServiceService,
              private router: Router,
              private prijavaService: PrijavaService) { }

  ngOnInit(): void {
    this.nav.hide();
    this.footer.hide();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.email = this.user.email;
    this.name = this.email.substring(0, this.email.lastIndexOf('@'));
    this.prijavaService.getNovePrijave().subscribe(prijave => {
      this.prijave = prijave;
      this.broj = prijave.length;
    });
  }
  resetPassword() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.email = auth.email;
      }
    });
    if (!this.email) {
      alert('Type in your email first');
    }
    this.auth.resetPasswordInit(this.email)
    .then(
      () => alert('A password reset link has been sent to your email address'),
      (rejectionReason) => alert(rejectionReason))
    .catch(e => alert('An error occurred while attempting to reset your password'));
  }
  logout() {
    this.nav.show();
    this.footer.show();
    this.auth.SignOut();
  }
}
