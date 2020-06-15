import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
import { FooterService } from '../../services/footer.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public nav: NavbarService,
              public footer: FooterService,
              private auth: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.nav.hide();
    this.footer.hide();
  }
  logout() {
    this.nav.show();
    this.footer.show();
    this.auth.SignOut();
  }
}
