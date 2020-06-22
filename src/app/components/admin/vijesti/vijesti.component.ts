import { Component, OnInit } from '@angular/core';

import { VijestiService } from '../../../services/vijesti.service';

import { Vijest } from '../../../models/Vijest';

@Component({
  selector: 'app-vijesti',
  templateUrl: './vijesti.component.html',
  styleUrls: ['./vijesti.component.css']
})
export class VijestiComponent implements OnInit {
  vijesti: Vijest[];
  constructor(private vijestiService: VijestiService) { }

  ngOnInit(): void {
    this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
    });
  }

}
