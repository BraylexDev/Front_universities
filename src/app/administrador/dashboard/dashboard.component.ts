import { Component } from '@angular/core';
import { User } from 'src/app/domain/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  activeTab: string = 'profile';
  currentUser: User | null = null;
  sidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/admin']);
    }

    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      this.activeTab = savedTab;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.sidebarOpen = false;
    localStorage.setItem('activeTab', tab);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    if (confirm('¿Are you sure you want to log out?')) {
      localStorage.removeItem('activeTab');
      this.authService.logout();
      this.router.navigate(['/admin']);
    }
  }

  onOverlayClick(): void {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }
}
