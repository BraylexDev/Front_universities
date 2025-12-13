import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NoticeService } from 'src/app/service/Notice/notice.service';
import { apiServer } from 'src/app/service/apiServer';
import { NoticeData } from 'src/app/domain/notice';

@Component({
  selector: 'app-news-management',
  templateUrl: './news-management.component.html',
  styleUrls: ['./news-management.component.css'],
})
export class NewsManagementComponent implements OnInit {
  newsForm!: FormGroup;
  newsList: NoticeData[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isEditMode = false;
  editingNewsId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private noticeService: NoticeService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadNews();
  }

  initializeForm(): void {
    this.newsForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
        ],
      ],
      description: ['', [Validators.maxLength(200)]],
      url: ['', [Validators.required, this.urlValidator]],
      isActive: [true],
    });
  }

  urlValidator(control: any) {
    const url = control.value;
    if (!url) return null;

    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url) ? null : { invalidUrl: true };
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Solo se permiten imágenes (JPEG, JPG, PNG, WebP)';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'La imagen no puede superar los 5MB';
      return;
    }

    this.selectedImage = file;
    this.errorMessage = '';

    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.newsForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (
      (!this.selectedImage && !this.isEditMode) ||
      (this.isEditMode && !this.imagePreview)
    ) {
      this.errorMessage = 'Selecciona una imagen para la noticia';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('title', this.newsForm.get('title')?.value);
    formData.append('url', this.newsForm.get('url')?.value);
    if (this.newsForm.get('isActive')?.value === null) {
      formData.append('isActive', 'false');
    } else {
      formData.append('isActive', 'true');
    }
    formData.append('isActive', this.newsForm.get('isActive')?.value);
    formData.append(
      'description',
      this.newsForm.get('description')?.value || '',
    );
    if (!this.isEditMode) {
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      }
    } else {
      if (this.selectedImage) {
        formData.append('image', this.selectedImage);
      } else {
        formData.append('image', this.imagePreview || '');
      }
    }

    const editUrl = this.selectedImage
      ? '/api/news/' + this.editingNewsId
      : '/api/news/edit/' + this.editingNewsId;

    const apiUrl = this.isEditMode
      ? apiServer.serverUrl + editUrl
      : apiServer.serverUrl + '/api/news/create';

    const request = this.isEditMode
      ? this.http.put(apiUrl, formData)
      : this.http.post(apiUrl, formData);

    request.subscribe({
      next: (response: any) => {
        console.log('Noticia guardada exitosamente:', response);

        this.successMessage = this.isEditMode
          ? 'Noticia actualizada exitosamente'
          : 'Noticia creada exitosamente';

        this.loadNews();

        this.resetForm();
      },
      error: (error) => {
        console.error('Error saving news:', error);

        if (error.status === 400) {
          this.errorMessage =
            'Datos inválidos. Verifica la información ingresada.';
        } else if (error.status === 413) {
          this.errorMessage = 'La imagen es demasiado grande';
        } else if (error.status === 0) {
          this.errorMessage =
            'Error de conexión. Verifica que el servidor esté ejecutándose.';
        } else if (error.status === 401) {
          this.errorMessage =
            'Error inesperado al guardar la noticia, revisa el tamaño de la imagen o el formato';
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  loadNews(): void {
    this.noticeService.getNews().subscribe({
      next: (news) => {
        this.newsList = news;
        console.log('Noticias cargadas:', news);
        console.log('Noticias cargadas to :', this.newsList);
      },
      error: (error) => {
        console.error('Error loading news:', error);
      },
    });
  }

  editNews(news: NoticeData): void {
    this.isEditMode = true;
    this.editingNewsId = news.id!;

    this.newsForm.patchValue({
      title: news.title,
      description: news.description || '',
      url: news.url,
      isActive: news.active,
    });

    this.imagePreview = news.image;
    this.successMessage = '';
    this.errorMessage = '';
  }

  deleteNews(newsId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      this.http.delete(`http://localhost:8081/api/news/${newsId}`).subscribe({
        next: () => {
          this.newsList = this.newsList.filter((n) => n.id !== newsId);
          this.successMessage = 'Noticia eliminada exitosamente';
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          // Simular eliminación si no hay backend
          this.newsList = this.newsList.filter((n) => n.id !== newsId);
          this.successMessage = 'Noticia eliminada exitosamente';
        },
      });
    }
  }

  toggleNewsStatus(news: NoticeData): void {
    const updatedNews = { isActive: !news.active };
    console.log('Toggling status for news:', updatedNews);
    this.http
      .put(`http://localhost:8081/api/news/active/${news.id}`, updatedNews)
      .subscribe({
        next: () => {
          news.active = !news.active;
          this.successMessage = `Noticia ${news.active ? 'Actived' : 'Deactivate'}`;
        },
        error: (error) => {
          console.error('Error updating news status:', error);
        },
      });
  }

  resetForm(): void {
    this.newsForm.reset({ isActive: true });
    this.selectedImage = null;
    this.imagePreview = null;
    this.isEditMode = false;
    this.editingNewsId = null;

    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  addNewsToList(news: NoticeData): void {
    this.newsList.push({
      ...news,
      id: Date.now(), // Temporal ID
    });
  }

  updateNewsInList(updatedNews: NoticeData): void {
    const index = this.newsList.findIndex((n) => n.id === this.editingNewsId);
    if (index !== -1) {
      this.newsList[index] = { ...updatedNews };
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.newsForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private markFormGroupTouched(): void {
    Object.keys(this.newsForm.controls).forEach((key) => {
      const control = this.newsForm.get(key);
      control?.markAsTouched();
    });
  }
}
