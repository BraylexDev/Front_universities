import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stateCtrl = new FormControl('');
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Abu Dhabi University',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_President_of_the_United_Arab_Emirates_%281973%E2%80%932008%29.svg',
    },
    {
      name: 'Zayed University',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_President_of_the_United_Arab_Emirates_%281973%E2%80%932008%29.svg',
    },
    {
      name: 'American University in Dubai',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_President_of_the_United_Arab_Emirates_%281973%E2%80%932008%29.svg',
    },
    {
      name: 'Khalifa University',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Flag_of_the_President_of_the_United_Arab_Emirates_%281973%E2%80%932008%29.svg',
    },
  ];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }

}
