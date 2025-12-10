import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, provideHttpClient  } from '@angular/common/http';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { PaginatedRankingResponseDto, Ranking, RankingFiltersDto, UploadInfoDto } from 'src/app/domain/ranking';
import { apiServer } from '../apiServer';

@Injectable({
  providedIn: 'root'
})
export class RankingserviceService {
  private newRanks!: Observable<Ranking[]>;

  private baseUrl: string = apiServer.serverUrl+"/api/ranking";

  
  constructor(private http: HttpClient) { }

  /* crearNoticia(noticia: { titulo: string; descripcion: string; url: string; }, file: File): Observable<any> {
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
  */
  getYears(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl+"/years");
  }

  upload(year:number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('year', year.toString());
    formData.append('file', file);
    
    return this.http.post(this.baseUrl+"/upload", formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getTopRanking(data: { year: number; size: number; }): Observable<PaginatedRankingResponseDto> {
    const params = {
      year: data.year.toString(),
      size: data.size.toString()
    };
    return this.http.get<PaginatedRankingResponseDto>(this.baseUrl, { params });
  }

  getFilterCountry(data: { year: number, country: string}): Observable<PaginatedRankingResponseDto> {
    const params = {
      year: data.year.toString(),
      country: data.country
    };
    return this.http.get<PaginatedRankingResponseDto>(this.baseUrl, { params });
  }

  getFilterCountryUniversity(data: { year: number, country: string, university: string}): Observable<PaginatedRankingResponseDto> {
    const params = {
      year: data.year.toString(),
      country: data.country,
      institution: data.university
    };
    return this.http.get<PaginatedRankingResponseDto>(this.baseUrl, { params });
  }

  getFilterCountryUniversityCategory(data: { year: number, country: string, university: string, category: string}): Observable<PaginatedRankingResponseDto> {
    const params = {
      year: data.year.toString(),
      country: data.country,
      institution: data.university,
      category: data.category
    };
    return this.http.get<PaginatedRankingResponseDto>(this.baseUrl, { params });
  }
  
  getSubcategories(year: number, category: string): Observable<string[]> {
    const params = {
      year: year.toString(),
      category: category
    };
    return this.http.get<string[]>(this.baseUrl + "/subcategories", { params });
  }

  getLastYear(): Observable<number> {
    return this.http.get<number[]>(this.baseUrl + "/years").pipe(
      map(years => years[0])
    );
  }

  getFilters(year?: number): Observable<RankingFiltersDto> {
    let params = new HttpParams();
    
    if (year) {
      params = params.append('year', year.toString());
    }
    
    return this.http.get<RankingFiltersDto>(this.baseUrl+"/filters", { params });
  }
}
