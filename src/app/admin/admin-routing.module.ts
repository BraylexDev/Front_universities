import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin.component';
import { UploadFileComponent } from './uploadFile/upload-file/upload-file.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'dashboard', component: DashboardComponent,
        children: [
          { path: 'upload', component: UploadFileComponent }
        ]
      }
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