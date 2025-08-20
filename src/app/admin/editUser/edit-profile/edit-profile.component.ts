import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/domain/user';
import { AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: User | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.initializeForm();
    this.loadUserData();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      newPassword: [''],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  loadUserData(): void {
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        userName: this.currentUser.userName,
        email: this.currentUser.email,
        rol: this.currentUser.rol
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) return null;

    if (newPassword.value && confirmPassword.value) {
      return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
    }

    return null;
  }

  get passwordMismatch(): boolean {
    return this.profileForm.hasError('passwordMismatch') && 
           this.profileForm.get('confirmPassword')?.touched || false;
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = this.profileForm.value;
    
    // TODO: Implementar llamada al backend para actualizar perfil
    // Por ahora simulamos la actualización
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Perfil actualizado correctamente';
      
      // Actualizar datos locales
      if (this.currentUser) {
        this.currentUser.name = formData.name;
        this.currentUser.userName = formData.userName;
        this.currentUser.email = formData.email;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
      
      // Limpiar campos de contraseña
      this.profileForm.patchValue({
        newPassword: '',
        confirmPassword: ''
      });
    }, 1500);
  }

  resetForm(): void {
    this.loadUserData();
    this.successMessage = '';
    this.errorMessage = '';
    this.profileForm.markAsUntouched();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }
}