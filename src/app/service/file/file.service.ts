import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datas } from 'src/app/domain/datas';
import { apiServer } from '../apiServer';
import { RankingTest } from 'src/app/domain/rankingTest';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl: string = apiServer.serverUrl;

  constructor(private http: HttpClient) { }

  getData(): Observable<Datas[]>{
    return this.http.get<Datas[]>(`${this.baseUrl}/api/excel/datas`);
  }

 /*  upload(): Observable<RankingTest> {
    return this.http.post<RankingTest[]>(`${this.baseUrl}/api/excel/upload`);
  }*/
} 
