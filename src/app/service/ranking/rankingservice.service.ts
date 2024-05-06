import { Injectable } from '@angular/core';
import { HttpClient, provideHttpClient  } from '@angular/common/http';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { Ranking } from 'src/app/domain/ranking';

const baseUrl = 'http://localhost:8081/ranking';

@Injectable({
  providedIn: 'root'
})
export class RankingserviceService {
  private newRanks!: Observable<Ranking[]>;
  
  constructor(private http: HttpClient) { }

  getYear(year: any): Observable<Ranking[]> {
    
    return this.http.get<Ranking[]>(baseUrl + "/table/" + year)
      .pipe(
        catchError(this.handleError<Ranking[]>('getYear', []))
      );
  }

  getTop(year: any): Observable<Ranking[]>{
    return this.http.get<Ranking[]>(baseUrl+"/top/"+year)
      .pipe(
        catchError(this.handleError<Ranking[]>('getTop', []))
      );
  }

  getRankingLarge(year: any) {
    /* return this.http.get */
    return Promise.resolve(this.getYear(year));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
