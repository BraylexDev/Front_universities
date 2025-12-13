import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

// PrimeNG Modules
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// Components
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RankingComponent } from './ranking/ranking.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LazyLoadImageDirective } from '../shared/directives/lazy-load-image.directive';
import { MethodologyComponent } from './methodology/methodology.component';
import { CommitteeComponent } from './methodology/committee/committee.component';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomeComponent, data: { breadcrumb: 'home' } },
      {
        path: 'about',
        component: AboutComponent,
        data: { breadcrumb: 'about' },
      },
      {
        path: 'ranking',
        component: RankingComponent,
        data: { breadcrumb: 'ranking' },
      },
      {
        path: 'methodology',
        component: MethodologyComponent,
        data: { breadcrumb: 'methodology' },
      },
      {
        path: 'committee',
        component: CommitteeComponent,
        data: { breadcrumb: 'committee' },
      },
      {
        path: 'contact',
        component: ContactComponent,
        data: { breadcrumb: 'contact' },
      },
    ],
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    RankingComponent,
    MethodologyComponent,
    CommitteeComponent,
    LazyLoadImageDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),

    // Material
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,

    // PrimeNG
    CarouselModule,
    TagModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    InputTextModule,
    ScrollTopModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    AccordionModule,
    PanelModule,

    // Translation with lazy loading strategy
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ClientModule {}

// Translation Factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
