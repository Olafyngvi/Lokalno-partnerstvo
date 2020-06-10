import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    BodyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
