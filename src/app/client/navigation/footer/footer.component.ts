import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentLanguage: any | undefined;

  constructor(public translate: TranslateService) {
    const storedLang = localStorage.getItem('language');
    const defaultLang = storedLang || 'en';
    this.currentLanguage = defaultLang;
  }
}
