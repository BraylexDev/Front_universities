import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

import { ProductService } from '../service/product.service';
import { Product } from '../domain/product';
import { Ranking } from '../domain/ranking';
import { RankingserviceService } from '../service/ranking/rankingservice.service';
import { TranslateService } from '@ngx-translate/core';
import { Scroller } from 'primeng/scroller';
import { TestServiceService } from '../service/testRanking/test-service.service';
import { RankingTest } from '../domain/rankingTest';

export interface State {
  flag: string;
  name: string;
  population: string;
}
/* info tabla */
export interface PeriodicElement {
  category: string;
  subcategory: string;
  university: string;
  position: number;
  country: string;
  score: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, university: 'Suspendisse Aliquet Institute', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence', country: 'Togo', score: 256},
  {position: 2, university: 'Aenean Eget Metus Corp', category: 'Economics and Business',  subcategory:'', country: 'uzbekistán', score: 230},
  {position: 3, university: 'Molestie Dapibus Ligula Foundation', category: 'Social Sciences',  subcategory:'',country: 'Irán', score: 222},
  {position: 4, university: 'Non Luctus Sit Incorporated', category: 'Physics',  subcategory:'Applied Mathematics',country: 'Bulgaria', score: 210},
  {position: 5, university: 'Ullamcorper Velit In Institute', category: 'Neuroscience',  subcategory:'',country: 'Bulgaria', score: 203},
  {position: 6, university: 'Ut Odio LLC', category:'Geosciences',  subcategory:' ',country: 'Brunei', score: 170},
  {position: 7, university: 'Cursus LLP', category: 'Clinical Medicine',  subcategory:' ',country: 'Laos', score: 156},
  {position: 8, university: 'Ut Sem LLP', category: 'Physics',  subcategory:'Applied Mathematics',country: 'Togo', score: 106},
  {position: 9, university: 'Scelerisque Consulting', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence',country: 'Togo', score: 96},
  {position: 10, university: 'Morbi Metus Ltd', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence', country: 'Falkland Islands', score: 86},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /* Scroll to top */
  @Output() scrollToTop = new EventEmitter<void>();

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }

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

/* Info tabla  */

  test: RankingTest[] = [];
  loading: boolean = true;

  rankings: Ranking[] = [];

  displayedColumns: string[] = ['position', 'university', 'category', 'subcategory', 'country', 'score'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  currentLanguage = 'en';
  constructor( private productService: ProductService, private rankingService: RankingserviceService,  public translate: TranslateService, private testService: TestServiceService) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this._filterStates(state) : this.states.slice())),
    );
    translate.addLangs(['en', 'ar']);
    const storedLang = localStorage.getItem('language');
    const defaultLang = storedLang || 'en';
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
    localStorage.setItem('language', defaultLang);
    this.currentLanguage = defaultLang;
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }
  /* For table top 10 */



  //for carousel of news
  products: Product[] = [];

  responsiveOptions: any[] = [];
  public stocklist: any;

  ngOnInit() {
    //test
    this.testService.getRanking()
      .subscribe(res => {
        this.test = Object.values(res).slice(0,10);
        /* console.log(this.test); */
        this.loading = false;
      })

    /* this.rankingService.getTop(2023).subscribe(
      data => this.rankings = data
    ) */

      this.productService.getProductsSmall().then((products) => {
          this.products = products;
      });

      this.responsiveOptions = [
          {
              breakpoint: '1024px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '768px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }
  
}
