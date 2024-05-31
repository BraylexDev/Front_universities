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

//sidenav
import {MatExpansionModule} from '@angular/material/expansion';

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
import { RankingYearComponent } from './ranking/ranking-year/ranking-year.component';
import { NewsComponent } from './news/news/news.component';
import { DetailNewComponent } from './news/detail-new/detail-new.component';

/* Table rankings*/
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerserviceService } from './service/customer/customerservice.service';
import { ProductService } from './service/product.service';
import { InputTextModule } from 'primeng/inputtext';

/* Scroll Top */
import { ScrollTopModule } from 'primeng/scrolltop';


/* Translate */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ClientRoutingModule } from './navigation/header/client-routing.module';


/* admin */
import { SidebarModule } from 'primeng/sidebar';
import { MethodologyComponent } from './ranking/methodology/methodology.component';
import { CommitteeComponent } from './ranking/committee/committee.component';
import { FaqsComponent } from './faqs/faqs.component';

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
    RankingYearComponent,
    NewsComponent,
    DetailNewComponent,
    AdminComponent,
    MethodologyComponent,
    CommitteeComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    ClientRoutingModule,
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
    InputTextModule,
    ScrollTopModule,
    SidebarModule,
    MatExpansionModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  providers: [ CustomerserviceService, ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}