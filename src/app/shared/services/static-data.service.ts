import { Injectable } from '@angular/core';
import { CodeCountry, Country } from 'src/app/domain/country';
import { Category, University } from 'src/app/domain/filter';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  private readonly countries: Country[] = [
    /* datos */
  ];
  private readonly codesCountries: CodeCountry[] = [
    /* datos */
  ];
  private readonly categories: Category[] = [
    /* datos */
  ];
  private readonly universities: University[] = [
    /* datos */
  ];

  getCountries(): Country[] {
    return [...this.countries]; // Return copy
  }

  getCodeCountries(): CodeCountry[] {
    return [...this.codesCountries];
  }
}
