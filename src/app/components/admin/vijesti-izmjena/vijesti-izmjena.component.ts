import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToolbarService, LinkService, ImageService,
  HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';

import { VijestiService } from '../../../services/vijesti.service';
import { KategorijeVijestiService } from '../../../services/kategorije-vijesti.service';
import { MyImageService } from '../../../services/my-image.service';

import { Vijest } from '../../../models/Vijest';
import { KategorijaVijesti } from 'src/app/models/KategorijaVijesti';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-vijesti-izmjena',
  templateUrl: './vijesti-izmjena.component.html',
  styleUrls: ['./vijesti-izmjena.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class VijestiIzmjenaComponent implements OnInit {
  @ViewChild('fromRTE')
  private rteEle: RichTextEditorComponent;
  public value: string = null;
  forma: FormGroup;
  url: 'https://console.firebase.google.com/u/2/project/obrazovanje-odraslih/storage/obrazovanje-odraslih.appspot.com/files~2FVijesti';
  id: string;
  category: string;
  selectedFile: ImageSnippet;
  vijest: Vijest;
  selectedObj: string;
  kategorije: KategorijaVijesti[];

  constructor(private storage: AngularFireStorage,
              private vijestiService: VijestiService,
              private imageService: MyImageService,
              private kategorijeService: KategorijeVijestiService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.vijestiService.getVijest('vijesti', this.id).subscribe(vijest => {
      this.vijest = vijest;
      this.selectedObj = this.vijest.Kategorija;
      this.value = this.vijest.Sadrzaj;
      const ref = this.storage.ref(`Vijesti/${this.vijest.Podnaslov}`);
      this.vijest.Slika = ref.getDownloadURL();
    });
    this.kategorijeService.getKategorijeVijesti().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }
  rteCreated(): void {
    this.rteEle.element.focus();
}
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);

  }
  onSubmit({value, valid}: {value: Vijest, valid: boolean}) {
    if (!valid) {
      console.log(valid);
    } else {
        if (this.selectedFile === undefined) {
          this.vijest.Kategorija = this.selectedObj;
          this.vijest.Sadrzaj = this.value;
          this.vijestiService.updateVijest(this.vijest.Id, this.vijest);
          this.router.navigate([`/dashboard/vijesti/`]);
        } else {
          this.vijest.Kategorija = this.selectedObj;
          this.vijest.Sadrzaj = this.value;
          this.vijestiService.updateVijest(this.vijest.Id, this.vijest);
          this.imageService.deleteImage(this.vijest.Podnaslov, 'Vijesti');
          this.imageService.uploadImage(this.selectedFile.file, this.vijest.Podnaslov, 'Vijesti');
          this.router.navigate([`/dashboard/vijesti/`]);
        }
    }
  }
}
