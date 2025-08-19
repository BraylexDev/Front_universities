import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/service/user/login.service';
import { Login } from '../../domain/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData!: Login;
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.loginData = {
      userName: '',
      password: ''
    };
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { userName, password } = this.loginForm.value;
    this.loginData.userName = userName;
    this.loginData.password = password;
    console.log('Datos enviados:', this.loginData);
    this.loginService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error(err);
      }
    });
  }
}
