import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VijestiComponent } from './components/vijesti/vijesti.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VijestiAddComponent } from './components/admin/vijesti-add/vijesti-add.component';
import { DashboardIndexComponent } from './components/admin/dashboard-index/dashboard-index.component';
import { KategorijeVijestiComponent } from './components/admin/kategorije-vijesti/kategorije-vijesti.component';
import { KategorijeVijestiAddComponent } from './components/admin/kategorije-vijesti-add/kategorije-vijesti-add.component';
import { KategorijeVijestiIzmjenaComponent } from './components/admin/kategorije-vijesti-izmjena/kategorije-vijesti-izmjena.component';
import { SveVijestiComponent } from './components/admin/sve-vijesti/sve-vijesti.component';
import { VijestiIzmjenaComponent } from './components/admin/vijesti-izmjena/vijesti-izmjena.component';
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
import { UploaderComponent } from './components/admin/uploader/uploader.component';
import { SvePublikacijeComponent } from './components/admin/sve-publikacije/sve-publikacije.component';
import { PublikacijaIzmjenaComponent } from './components/admin/publikacija-izmjena/publikacija-izmjena.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent},
  {path: 'vijesti', component: VijestiComponent},
  {path: 'vijest/:id', component: VijestComponent},
  { path: 'registracija', component: SignUpComponent },
  { path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: DashboardIndexComponent},
      {path: 'dogadjaji', component: DogadjajiComponent},
      {path: 'kursevi', component: KurseviComponent},
      {path: 'obuke', component: ObukeComponent},
      {path: 'novi-dogadjaj', component: DogadjajAddComponent},
      {path: 'nova-obuka', component: ObukaAddComponent},
      {path: 'novi-kurs', component: KursAddComponent},
      {path: 'vijesti', component: SveVijestiComponent},
      {path: 'nova-vijest', component: VijestiAddComponent},
      {path: 'nova-kategorija-vijesti', component: KategorijeVijestiAddComponent},
      {path: 'kategorije-vijesti', component: KategorijeVijestiComponent},
      {path: 'kategorije-kursevi', component: KategorijeKurseviComponent},
      {path: 'nova-kategorija-kurs', component: KategorijeKurseviAddComponent},
      {path: 'izmjena-kategorija-vijest/:id', component: KategorijeVijestiIzmjenaComponent},
      {path: 'izmjena-kategorija-kurs/:id', component: KategorijeKurseviIzmjenaComponent},
      {path: 'izmjena-vijest/:id', component: VijestiIzmjenaComponent},
      {path: 'izmjena-kurs/:id', component: KursIzmjenaComponent},
      {path: 'izmjena-obuka/:id', component: ObukaIzmjenaComponent},
      {path: 'izmjena-dogadjaj/:id', component: DogadjajIzmjenaComponent},
      {path: 'izmjena-publikacija/:id', component: PublikacijaIzmjenaComponent},
      {path: 'asd', component: UploaderComponent},
      {path: 'publikacije', component: SvePublikacijeComponent}

    ] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
