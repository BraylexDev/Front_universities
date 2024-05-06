import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UniversitiesComponent } from './universities/universities.component';
import { ContactComponent } from './contact/contact.component';
import { RankingComponent } from './ranking/ranking.component';

const routes: Routes = [
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }