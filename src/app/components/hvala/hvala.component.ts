import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hvala',
  templateUrl: './hvala.component.html',
  styleUrls: ['./hvala.component.css']
})
export class HvalaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 5000);
  }

}
