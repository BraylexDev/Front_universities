import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component'; 
import { AboutComponent } from 'src/app/about/about.component'; 
import { UniversitiesComponent } from 'src/app/universities/universities.component';
import { ContactComponent } from 'src/app/contact/contact.component'; 
import { RankingComponent } from 'src/app/ranking/ranking.component'; 
import { HeaderComponent } from './header.component';
import { MethodologyComponent } from 'src/app/ranking/methodology/methodology.component';
import { CommitteeComponent } from 'src/app/ranking/committee/committee.component';
import { NotfoundComponent } from 'src/app/notFound/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HeaderComponent, 
    children : [
      { path: 'about', component: AboutComponent, data: { breadcrumb: 'about' }},
      { path: '', component: HomeComponent, data: { breadcrumb: 'home' }},
      { path: 'ranking', component: RankingComponent, data: { breadcrumb: 'ranking' }},
      { path: 'methodology', component: MethodologyComponent},
      { path: 'committee', component: CommitteeComponent},
      { path: 'universities', component: UniversitiesComponent, data: { breadcrumb: 'universities' }},
      { path: 'contact', component: ContactComponent, data: { breadcrumb: 'contact' }},
    ]
  },
  { path: 'home', redirectTo:''},
  { path: '**', pathMatch: 'full', component: NotfoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }