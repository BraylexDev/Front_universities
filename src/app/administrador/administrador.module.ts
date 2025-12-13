import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Guards
import { AuthGuard } from '../guards/auth.guard';

// Components
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { NewsManagementComponent } from './news-management/news-management.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: LoginComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'ranking', component: UploadFileComponent },
          { path: 'news', component: NewsManagementComponent },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    UploadFileComponent,
    EditProfileComponent,
    NewsManagementComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatProgressBarModule,
  ],
})
export class AdministradorModule {}
