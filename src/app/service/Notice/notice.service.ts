import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiServer } from '../apiServer';
import { Observable } from 'rxjs';
import { NoticeData } from 'src/app/domain/notice';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private baseUrl: string = apiServer.serverUrl + '/api/news';

  constructor(private http: HttpClient) {}

  crearNoticia(noticia: { titulo: string; descripcion: string; url: string; }, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', noticia.titulo);
    formData.append('descripcion', noticia.descripcion);
    formData.append('url', noticia.url);
    formData.append('imagen', file, file.name);

    return this.http.post(this.baseUrl, formData);
  }

  getNewsAct(): Observable<NoticeData[]> {
    return this.http.get<any[]>(this.baseUrl+"/actives");
  }

  getNews(): Observable<NoticeData[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
