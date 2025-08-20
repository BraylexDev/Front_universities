import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth/auth.service';
import { User } from 'src/app/domain/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  activeTab: string = 'profile';
  currentUser: User | null = null;
  sidebarOpen = false;

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.AuthService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.sidebarOpen = false;
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.AuthService.logout();
      this.router.navigate(['/admin']);
    }
  }
}
