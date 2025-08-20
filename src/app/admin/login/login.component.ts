import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { LoginRequest } from 'src/app/domain/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirigir si ya está autenticado
    if (this.AuthService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
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
    console.log('Datos de login:', loginData);
    this.AuthService.login(loginData).subscribe({
      next: (response) => {
        /* console.log('Login exitoso:', response); */
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else if (error.status === 0) {
          this.errorMessage = 'Error de conexión. Verifica que el servidor esté ejecutándose.';
        } else {
          this.errorMessage = 'Error inesperado. Intenta nuevamente.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
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
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
}
