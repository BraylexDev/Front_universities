import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
/* translate */
import { TranslateService } from '@ngx-translate/core';
import { Scroller } from 'primeng/scroller';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  
  opened: boolean;
  
  @ViewChild('sc')
  sc!: Scroller;

  isDarkTheme: boolean = false;
  themeActivate: any = this.isDarkTheme === true ? "bedtime" : "light_mode";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  currentLanguage = 'en';

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, public translate: TranslateService) {
    this.opened = false;
    translate.addLangs(['en', 'ar']);
    const storedLang = localStorage.getItem('language');
    const defaultLang = storedLang || 'en';
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
    localStorage.setItem('language', defaultLang);
    this.currentLanguage = defaultLang;
  }

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
  }

  goContacts(){
    this.router.navigate(['/','contact']);
  }

  /* Change language */
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    /* this.common.lang = language; */
    this.currentLanguage = language;
  }

  close() {
    this.opened = !this.opened;
    console.log(this.opened);
  }
  
  reset() {
    this.sc.scrollToIndex(0, 'smooth');
  }
}


