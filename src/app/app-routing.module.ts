import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UniversitiesComponent } from './universities/universities.component';
import { ContactComponent } from './contact/contact.component';
import { RankingComponent } from './ranking/ranking.component';
import { MethodologyComponent } from './ranking/methodology/methodology.component';
import { CommitteeComponent } from './ranking/committee/committee.component';
import { NotfoundComponent } from './notFound/notfound/notfound.component';

const routes: Routes = [
  /* { path: 'home', component: HomeComponent, data: { breadcrumb: 'home' } },
  { path: 'about', component: AboutComponent, data: { breadcrumb: 'about' } },
  { path: 'ranking', component: RankingComponent, data: { breadcrumb: 'ranking' } },
  { path: 'methodology', component: MethodologyComponent },
  { path: 'committee', component: CommitteeComponent },
  { path: 'universities', component: UniversitiesComponent, data: { breadcrumb: 'universities' } },
  { path: 'contact', component: ContactComponent, data: { breadcrumb: 'contact' } },
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: '**', pathMatch: 'full', component: NotfoundComponent }
   */
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }