import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }