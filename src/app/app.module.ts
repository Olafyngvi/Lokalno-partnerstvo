import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VijestiComponent } from './components/vijesti/vijesti.component';
import { OblastiComponent } from './components/oblasti/oblasti.component';
import { UslugeComponent } from './components/usluge/usluge.component';
import { UkljuciSeComponent } from './components/ukljuci-se/ukljuci-se.component';
import { PublikacijeIPodaciComponent } from './components/publikacije-i-podaci/publikacije-i-podaci.component';
import { ONamaComponent } from './components/o-nama/o-nama.component';
import { BodyComponent } from './components/body/body.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { AuthServiceService } from './services/auth-service.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminTopbarComponent } from './components/admin-topbar/admin-topbar.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { CallActionComponent } from './components/admin/call-action/call-action.component';
import { VijestiAddComponent } from './components/admin/vijesti-add/vijesti-add.component';
import { DashboardIndexComponent } from './components/admin/dashboard-index/dashboard-index.component';
import { KategorijeVijestiComponent } from './components/admin/kategorije-vijesti/kategorije-vijesti.component';
import { KategorijeVijestiAddComponent } from './components/admin/kategorije-vijesti-add/kategorije-vijesti-add.component';
import { KategorijeVijestiIzmjenaComponent } from './components/admin/kategorije-vijesti-izmjena/kategorije-vijesti-izmjena.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SveVijestiComponent } from './components/admin/sve-vijesti/sve-vijesti.component';
import { VijestiIzmjenaComponent } from './components/admin/vijesti-izmjena/vijesti-izmjena.component';
import { AlertDialogComponent } from './components/admin/alert-dialog/alert-dialog.component';
import { VijestComponent } from './components/vijest/vijest.component';
import { KurseviComponent } from './components/admin/kursevi/kursevi.component';
import { KategorijeKurseviComponent } from './components/admin/kategorije-kursevi/kategorije-kursevi.component';
import { KategorijeKurseviAddComponent } from './components/admin/kategorije-kursevi-add/kategorije-kursevi-add.component';
import { KategorijeKurseviIzmjenaComponent } from './components/admin/kategorije-kursevi-izmjena/kategorije-kursevi-izmjena.component';
import { KursAddComponent } from './components/admin/kurs-add/kurs-add.component';
import { KursIzmjenaComponent } from './components/admin/kurs-izmjena/kurs-izmjena.component';
import { ObukeComponent } from './components/admin/obuke/obuke.component';
import { ObukaAddComponent } from './components/admin/obuka-add/obuka-add.component';
import { ObukaIzmjenaComponent } from './components/admin/obuka-izmjena/obuka-izmjena.component';
import { DogadjajiComponent } from './components/admin/dogadjaji/dogadjaji.component';
import { DogadjajAddComponent } from './components/admin/dogadjaj-add/dogadjaj-add.component';
import { DogadjajIzmjenaComponent } from './components/admin/dogadjaj-izmjena/dogadjaj-izmjena.component';
import { DropZoneDirective } from './drop-zone.directive';
import { UploaderComponent } from './components/admin/uploader/uploader.component';
import { UploadTaskComponent } from './components/admin/upload-task/upload-task.component';
import { SvePublikacijeComponent } from './components/admin/sve-publikacije/sve-publikacije.component';
import { PublikacijaIzmjenaComponent } from './components/admin/publikacija-izmjena/publikacija-izmjena.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    ScrollTopComponent,
    FooterComponent,
    NotFoundComponent,
    VijestiComponent,
    OblastiComponent,
    UslugeComponent,
    UkljuciSeComponent,
    PublikacijeIPodaciComponent,
    ONamaComponent,
    BodyComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    AdminTopbarComponent,
    TextEditorComponent,
    CallActionComponent,
    VijestiAddComponent,
    DashboardIndexComponent,
    KategorijeVijestiComponent,
    KategorijeVijestiAddComponent,
    KategorijeVijestiIzmjenaComponent,
    ConfirmationDialogComponent,
    SveVijestiComponent,
    VijestiIzmjenaComponent,
    AlertDialogComponent,
    VijestComponent,
    KurseviComponent,
    KategorijeKurseviComponent,
    KategorijeKurseviAddComponent,
    KategorijeKurseviIzmjenaComponent,
    KursAddComponent,
    KursIzmjenaComponent,
    ObukeComponent,
    ObukaAddComponent,
    ObukaIzmjenaComponent,
    DogadjajiComponent,
    DogadjajAddComponent,
    DogadjajIzmjenaComponent,
    DropZoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    SvePublikacijeComponent,
    PublikacijaIzmjenaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RichTextEditorModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
