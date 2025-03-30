import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { CodeCountry, Country } from '../domain/customer';

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
export class HomeComponent implements OnInit{

  
  countries: Country[] = [
    {name:"Algeria",code:"dz"},
    {name:"Australia",code:"au"},
    {name:"Austria",code:"at"},
    {name:"Bangladesh",code:"bd"},
    {name:"Belarus",code:"by"},
    {name:"Belgium",code:"be"},
    {name:"Bosnia and Herzegovina",code:"ba"},
    {name:"Brazil",code:"br"},
    {name:"Bulgaria",code:"bg"},
    {name:"Canada",code:"ca"},
    {name:"China",code:"cn"},
    {name:"Cyprus",code:"cy"},
    {name:"Czech Republic",code:"cz"},
    {name:"Egypt",code:"eg"},
    {name:"Finland",code:"fi"},
    {name:"France",code:"fr"},
    {name:"Germany",code:"de"},
    {name:"Greece",code:"gr"},
    {name:"Hungary",code:"hu"},
    {name:"India",code:"in"},
    {name:"Iran",code:"ir"},
    {name:"Iraq",code:"iq"},
    {name:"Ireland",code:"ie"},
    {name:"Italy",code:"it"},
    {name:"Japan",code:"jp"},
    {name:"Jordan",code:"jo"},
    {name:"Kazakhstan",code:"kz"},
    {name:"Kuwait",code:"kw"},
    {name:"Lebanon",code:"lb"},
    {name:"Libya",code:"ly"},
    {name:"Malaysia",code:"my"},
    {name:"Mauritania",code:"mr"},
    {name:"Morocco",code:"ma"},
    {name:"Netherlands",code:"nl"},
    {name:"New Zealand ",code:"nz"},
    {name:"Oman",code:"om"},
    {name:"Pakistan",code:"pk"},
    {name:"Palestine",code:"ps"},
    {name:"Portugal",code:"pt"},
    {name:"Qatar",code:"qa"},
    {name:"Saudi Arabia",code:"sa"},
    {name:"Singapore",code:"sg"},
    {name:"Somalia",code:"so"},
    {name:"South Africa",code:"za"},
    {name:"South Korea",code:"kr"},
    {name:"Spain",code:"es"},
    {name:"Sudan",code:"sd"},
    {name:"Sweden",code:"se"},
    {name:"Switzerland",code:"ch"},
    {name:"Syria",code:"sy"},
    {name:"Thailand",code:"th"},
    {name:"Tunisia",code:"tn"},
    {name:"Türkiye",code:"tr"},
    {name:"United Arab Emirates",code:"ae"},
    {name:"United Kingdom",code:"gb"},
    {name:"United States of America",code:"us"},
    {name:"Yemen",code:"ye"}
  ];
  codesCountries: CodeCountry[] = [
    {code2:"dza",code:"dz"},
    {code2:"aus",code:"au"},
    {code2:"aut",code:"at"},
    {code2:"bgd",code:"bd"},
    {code2:"blr",code:"by"},
    {code2:"bel",code:"be"},
    {code2:"bih",code:"ba"},
    {code2:"bra",code:"br"},
    {code2:"bgr",code:"bg"},
    {code2:"can",code:"ca"},
    {code2:"chn",code:"cn"},
    {code2:"cyp",code:"cy"},
    {code2:"cze",code:"cz"},
    {code2:"egy",code:"eg"},
    {code2:"fin",code:"fi"},
    {code2:"fra",code:"fr"},
    {code2:"deu",code:"de"},
    {code2:"grc",code:"gr"},
    {code2:"hun",code:"hu"},
    {code2:"ind",code:"in"},
    {code2:"irn",code:"ir"},
    {code2:"irq",code:"iq"},
    {code2:"irl",code:"ie"},
    {code2:"ita",code:"it"},
    {code2:"jpn",code:"jp"},
    {code2:"jor",code:"jo"},
    {code2:"kaz",code:"kz"},
    {code2:"kwt",code:"kw"},
    {code2:"lbn",code:"lb"},
    {code2:"lby",code:"ly"},
    {code2:"mys",code:"my"},
    {code2:"mrt",code:"mr"},
    {code2:"mar",code:"ma"},
    {code2:"nld",code:"nl"},
    {code2:"nzl",code:"nz"},
    {code2:"omn",code:"om"},
    {code2:"pak",code:"pk"},
    {code2:"pse",code:"ps"},
    {code2:"prt",code:"pt"},
    {code2:"qat",code:"qa"},
    {code2:"sau",code:"sa"},
    {code2:"sgp",code:"sg"},
    {code2:"som",code:"so"},
    {code2:"zaf",code:"za"},
    {code2:"kor",code:"kr"},
    {code2:"esp",code:"es"},
    {code2:"sdn",code:"sd"},
    {code2:"swe",code:"se"},
    {code2:"che",code:"ch"},
    {code2:"syr",code:"sy"},
    {code2:"tha",code:"th"},
    {code2:"tun",code:"tn"},
    {code2:"tur",code:"tr"},
    {code2:"are",code:"ae"},
    {code2:"gbr",code:"gb"},
    {code2:"usa",code:"us"},
    {code2:"yem",code:"ye"}
  ];
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
    this.onScrollToTop();

    //test
    this.testService.getRanking()
      .subscribe(res => {
        this.test = Object.values(res).slice(0,10);
        this.changeCodeCountry();
        this.specifyNameCountry();
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
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '768px',
              numVisible: 1,
              numScroll: 2
          },
          {
              breakpoint: '560px',
              numVisible: 1,
              numScroll: 1
          }
      ];
  }

  changeCodeCountry(){
    this.test = this.test.map(
      item => {
        const matchingCountry = this.codesCountries.find(c => c.code2 === item.codeCountry);
        const matchingWorking = this.codesCountries.find(c => c.code2 === item.codeWorking);

        return {
          ...item,
          codeCountry: matchingCountry ? matchingCountry.code: item.codeCountry,
          codeWorking: matchingWorking ? matchingWorking.code: item.codeWorking
        };
      });
  }
  specifyNameCountry(){
    this.test = this.test.map(
      item => {
        const matchingCountry = this.countries.find(c => c.code === item.codeCountry);
        const matchingWorking = this.countries.find(c => c.code === item.codeWorking);

        return {
          ...item,
          country: matchingCountry ? matchingCountry.name: item.country,
          working: matchingWorking ? matchingWorking.name: item.working
        };
      });
      /* console.log("this log method specifyNameCountry :" + JSON.stringify(this.test[0])) */
  }
  
}
