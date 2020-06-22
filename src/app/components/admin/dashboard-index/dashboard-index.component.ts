import { Component, OnInit } from '@angular/core';
import { VijestiService } from 'src/app/services/vijesti.service';
import { Vijest } from 'src/app/models/Vijest';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  vijesti: Vijest[];
  constructor(private vijestiService: VijestiService) { }

  ngOnInit(): void {
    this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
    });
  }

}
