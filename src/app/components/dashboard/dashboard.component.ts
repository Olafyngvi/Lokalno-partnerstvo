import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { FooterService } from '../../services/footer.service';
import { AuthServiceService } from '../../services/auth-service.service';

import { VijestiService } from '../../services/vijesti.service';
import { Vijest } from 'src/app/models/Vijest';

import { User } from '../../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  email: string;
  name: string;
  constructor(public nav: NavbarService,
              public footer: FooterService,
              private auth: AuthServiceService,
              private router: Router,
              ) { }

  ngOnInit(): void {
    this.nav.hide();
    this.footer.hide();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.email = this.user.email;
    this.name = this.email.substring(0, this.email.lastIndexOf('@'));
  }
  logout() {
    this.nav.show();
    this.footer.show();
    this.auth.SignOut();
  }
}
