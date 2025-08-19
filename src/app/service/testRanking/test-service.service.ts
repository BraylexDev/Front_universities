import { Injectable } from '@angular/core';

import { apiServer } from '../apiServer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RankingTest } from 'src/app/domain/rankingTest';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private ApiUrl: string = apiServer.serverUrl;
  constructor( private http: HttpClient) {  }

  getRanking(): Observable<RankingTest[]> {
    return this.http.get<RankingTest[]>(`${this.ApiUrl}/api/excel/datas`);
    
  }
}
