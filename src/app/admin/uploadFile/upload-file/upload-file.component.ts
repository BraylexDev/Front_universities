import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RankingserviceService } from 'src/app/service/ranking/rankingservice.service';

interface RankingFile {
  id?: number;
  fileName: string;
  year: number;
  uploadDate: Date;
  status: 'success' | 'error' | 'processing';
  size?: number;
}
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;
  uploadProgress = 0;
  successMessage = '';
  errorMessage = '';
  isDragOver = false;
  
  // Lista de archivos subidos
  uploadedFiles: RankingFile[] = [];
  
  // Años disponibles
  availableYears: number[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private rankingService: RankingserviceService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.generateYears();
  }

  initializeForm(): void {
    const currentYear = new Date().getFullYear();
    this.uploadForm = this.fb.group({
      year: [currentYear, [Validators.required, Validators.min(2020), Validators.max(2030)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2020; year <= currentYear + 5; year++) {
      this.availableYears.push(year);
    }
  }

  // Eventos de drag and drop
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.handleFileSelection(file);
  }

  handleFileSelection(file: File): void {
    if (!file) return;

    // Validar tipo de archivo
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
      'application/vnd.ms-excel', // xls
      'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Only Excel files are allowed (.xlsx)';
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.errorMessage = 'The file cannot exceed 10MB';
      return;
    }

    this.selectedFile = file;
    this.errorMessage = '';
    this.successMessage = '';
  }

  uploadFile(): void {
    if (!this.selectedFile || this.uploadForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('year', this.uploadForm.get('year')?.value.toString());

    this.isUploading = true;
    this.uploadProgress = 0;
    this.errorMessage = '';
    this.successMessage = '';


    this.rankingService.upload(this.uploadForm.get('year')?.value, this.selectedFile).subscribe({
      next: (event) => { 
         if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.successMessage = 'File uploaded successfully';
          this.addToUploadedFiles();
          this.resetForm();
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.isUploading = false;
        
        if (error.status === 400) {
          this.errorMessage = 'The file is not valid or a ranking already exists for this year';
        } else if (error.status === 413) {
          this.errorMessage = 'The file is too large';
        } else if (error.status === 0) {
          this.errorMessage = 'Connection error. Please check that the server is running.';
        } else {
          this.errorMessage = 'Unexpected error while uploading file';
        }
      },
      complete: () => {
        this.isUploading = false;
      }
      });      
    /* this.http.post('http://localhost:8081/api/ranking/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.successMessage = 'File uploaded successfully';
          this.addToUploadedFiles();
          this.resetForm();
        }
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.isUploading = false;
        
        if (error.status === 400) {
          this.errorMessage = 'The file is not valid or a ranking already exists for this year';
        } else if (error.status === 413) {
          this.errorMessage = 'The file is too large';
        } else if (error.status === 0) {
          this.errorMessage = 'Connection error. Please check that the server is running.';
        } else {
          this.errorMessage = 'Unexpected error while uploading file';
        }
      },
      complete: () => {
        this.isUploading = false;
      }
    }); */
  }

  addToUploadedFiles(): void {
    if (this.selectedFile) {
      const newFile: RankingFile = {
        fileName: this.selectedFile.name,
        year: this.uploadForm.get('year')?.value,
        uploadDate: new Date(),
        status: 'success',
        size: this.selectedFile.size
      };
      this.uploadedFiles.unshift(newFile);
    }
  }

  resetForm(): void {
    this.selectedFile = null;
    this.uploadForm.patchValue({
      description: ''
    });
    this.uploadProgress = 0;
    
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.uploadForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.uploadForm.controls).forEach(key => {
      const control = this.uploadForm.get(key);
      control?.markAsTouched();
    });
  }
}
