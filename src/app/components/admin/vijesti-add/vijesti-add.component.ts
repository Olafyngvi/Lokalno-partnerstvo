import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Vijest } from 'src/app/models/Vijest';
import { Router } from '@angular/router';

import { VijestiService } from '../../../services/vijesti.service';
// tslint:disable-next-line: max-line-length
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-vijesti-add',
  templateUrl: './vijesti-add.component.html',
  styleUrls: ['./vijesti-add.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class VijestiAddComponent implements OnInit {
  constructor(private vijestiService: VijestiService,
              private router: Router) { }
  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
  vijest: Vijest = {
    naslov: '',
    sadrzaj: '',
    kategorija: '',
    datum: new Date(),
    fokus: true
  };
    rteCreated(): void {
      this.rteEle.element.focus();
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm): void {

      this.vijest.sadrzaj = this.value;
      console.log(this.value);
      console.log(this.vijest);
      // this.vijestiService.DodajVijest(this.vijest);
      // this.router.navigate([`dashboard`]);
  }
}
