import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieMessage: any = 'This website uses cookies to ensure you get the best experience on our website.';
  cookieDismiss: any = 'Got it';
  cookieLinkText: any = 'Learn more';
  title = 'Obrazovanje-odraslih';
  ngOnInit(): void {
    const cc = window as any;
    cc.cookieconsent.initialise({
      palette: {
        popup: {
          background: '#164969'
        },
        button: {
          background: '#ffe000',
          text: '#164969'
        }
      },
      theme: 'classic',
      content: {
        message: this.cookieMessage,
        dismiss: this.cookieDismiss,
        link: this.cookieLinkText,
        // href: environment.Frontend + '/dataprivacy'
      }
    });
  }
}
