import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public auth: AuthServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn === true) {
      this.router.navigate(['/dashboard']);
    }
  }
  onSubmit() {
    this.auth.SignIn(this.email, this.password);
  }
  resetPassword() {}
}
