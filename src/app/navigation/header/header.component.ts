import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  isDarkTheme: boolean = false;
  themeActivate: any = this.isDarkTheme === true ? "bedtime": "light_mode";
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(){
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true: false;
  }

  storeThemeSelection(){
    localStorage.setItem('theme', this.isDarkTheme ? "Dark":"Light");
  } 
}


