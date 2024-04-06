import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { MatGridListModule } from '@angular/material/grid-list';

//buscador
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './navigation/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';

//For Change Theme Dark/Light
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components created for dev
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UniversitiesComponent } from './universities/universities.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { RankingComponent } from './ranking/ranking.component';

//for table ranking 
import {MatTableModule} from '@angular/material/table';

//for card of news
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

import { ButtonModule } from 'primeng/button';
import { ScrollToTopComponent } from './navigation/scroll-to-top/scroll-to-top.component';
import { UniversityComponent } from './universities/university/university.component';
import { RankingYearComponent } from './ranking/ranking-year/ranking-year.component';
import { NewsComponent } from './news/news/news.component';
import { DetailNewComponent } from './news/detail-new/detail-new.component';

/* Table rankings*/
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { HttpClientModule } from '@angular/common/http';
import { CustomerserviceService } from './service/customer/customerservice.service';
import { ProductService } from './service/product.service';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    UniversitiesComponent,
    ContactComponent,
    FooterComponent,
    RankingComponent,
    ScrollToTopComponent,
    UniversityComponent,
    RankingYearComponent,
    NewsComponent,
    DetailNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatSlideToggleModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    HttpClientModule,
    InputTextModule
  ],
  providers: [ CustomerserviceService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
