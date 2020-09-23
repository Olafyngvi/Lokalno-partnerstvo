import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-aktuelno',
  templateUrl: './aktuelno.component.html',
  styleUrls: ['./aktuelno.component.css']
})
export class AktuelnoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#iot').hover( () => { // changed selector '.design' to '#container'
    $('.iotSlika').animate({
        opacity: '1'
    }, {
        queue: false
    });
}, () => {
    $('.iotSlika').animate({
        opacity: '0'
    }, {
        queue: false
    });
});
  }

}
