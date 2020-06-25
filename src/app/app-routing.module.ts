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
      {path: 'vijesti', component: SveVijestiComponent},
      {path: 'nova-vijest', component: VijestiAddComponent},
      {path: 'nova-kategorija', component: KategorijeVijestiAddComponent},
      {path: 'kategorije-vijesti', component: KategorijeVijestiComponent},
      {path: 'izmjena-kategorija/:id', component: KategorijeVijestiIzmjenaComponent},
      {path: 'izmjena-vijest/:id', component: VijestiIzmjenaComponent}

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
