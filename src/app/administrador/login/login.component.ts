import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { LoginRequest } from 'src/app/domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.AuthService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginData: LoginRequest = this.loginForm.value;
    this.AuthService.login(loginData).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;

        if (error.status === 401) {
          this.errorMessage = 'Incorrect username or password';
        } else if (error.status === 0) {
          this.errorMessage =
            'Connection error. Please check that the server is running.';
        } else {
          this.errorMessage = 'Unexpected error. Please try again.';
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
