import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/service/file/file.service';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  uploadSucess: boolean = false;
  selectedFile: File | null = null;

      constructor(private http: HttpClient) {}

      onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
      }

      uploadFile(): void {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          this.http.post('http://localhost:8081/api/excel/upload', formData)
            .subscribe((response: any) => {
              console.log('File uploaded successfully:', response);
              this.uploadSucess = true;
            }, (error: any) => {
              console.error('File upload failed:', error);
              this.uploadSucess = false;
            });
        }
      }

}
