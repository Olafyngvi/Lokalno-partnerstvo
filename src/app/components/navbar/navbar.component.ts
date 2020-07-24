import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(public nav: NavbarService,
              private authService: AuthServiceService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user => {
      this.user = user;
    });
  }

}
