import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UniversitiesComponent } from './universities/universities.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent},
  { path: 'universities', component: UniversitiesComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
