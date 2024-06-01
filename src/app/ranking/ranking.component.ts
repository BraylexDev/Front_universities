import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../service/breadcrumb/breadcrumb.service'; 


//table
import { Customer, Representative } from '../domain/customer';
import { CustomerserviceService } from '../service/customer/customerservice.service';
import { Table } from 'primeng/table';
import { RankingserviceService } from '../service/ranking/rankingservice.service';
import { Ranking } from '../domain/ranking';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { RankingTest } from '../domain/rankingTest';
import { TestServiceService } from '../service/testRanking/test-service.service';
import { FormControl, FormGroup } from '@angular/forms';

/* fields table */
interface Colm{
  label: string;
}

/* info tabla */
export interface PeriodicElement {
  university: string;
  position: number;
  category: string;
  subcategory: string;
  codeCountry: string;
  country: string;
  score: number;
}
export interface PeriodicElement2 {
  university: string;
  name: string;
  position: number;
  category: string;
  subcategory: string;
  codeCountry: string;
  country: string;
  score: number;
  profile:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, university: 'Suspendisse Aliquet Institute', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence', codeCountry:'tg', country: 'Togo', score: 256},
  {position: 2, university: 'Aenean Eget Metus Corp', category: 'Economics and Business',  subcategory:' ',codeCountry:'uz', country: 'uzbekistán', score: 230},
  {position: 3, university: 'Molestie Dapibus Ligula Foundation', category: 'Social Sciences',  subcategory:'',codeCountry:'ir', country: 'Irán', score: 222},
  {position: 4, university: 'Non Luctus Sit Incorporated', category: 'Physics',  subcategory:'Applied Mathematics',codeCountry:'bg', country: 'Bulgaria', score: 210},
  {position: 5, university: 'Ullamcorper Velit In Institute', category: 'Neuroscience',  subcategory:'', codeCountry:'bg', country: 'Bulgaria', score: 203},
  {position: 6, university: 'Ut Odio LLC', category:'Geosciences',  subcategory:' ',codeCountry:'bn', country: 'Brunei', score: 170},
  {position: 7, university: 'Cursus LLP', category: 'Clinical Medicine',  subcategory:'', codeCountry:'la', country: 'Laos', score: 156},
  {position: 8, university: 'Ut Sem LLP', category: 'Physics',  subcategory:'Applied Mathematics',codeCountry:'tg', country: 'Togo', score: 106},
  {position: 9, university: 'Scelerisque Consulting', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence',codeCountry:'tg', country: 'Togo', score: 96},
  {position: 10, university: 'Morbi Metus Ltd', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence',codeCountry:'fk', country: 'Falkland Islands', score: 86},
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {position: 1, name: 'Andres Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Suspendisse Aliquet Institute', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence', codeCountry:'tg', country: 'Togo', score: 256},
  {position: 2, name: 'Felipe Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Aenean Eget Metus Corp', category: 'Economics and Business',  subcategory:' ',codeCountry:'uz', country: 'uzbekistán', score: 230},
  {position: 3, name: 'Andres Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Molestie Dapibus Ligula Foundation', category: 'Social Sciences',  subcategory:'',codeCountry:'ir', country: 'Irán', score: 222},
  {position: 4, name: 'Felipe Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Non Luctus Sit Incorporated', category: 'Physics',  subcategory:'Applied Mathematics',codeCountry:'bg', country: 'Bulgaria', score: 210},
  {position: 5, name: 'Andres Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Ullamcorper Velit In Institute', category: 'Neuroscience',  subcategory:'', codeCountry:'bg', country: 'Bulgaria', score: 203},
  {position: 6, name: 'Carlos Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Ut Odio LLC', category:'Geosciences',  subcategory:' ',codeCountry:'bn', country: 'Brunei', score: 170},
  {position: 7, name: 'Andres Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Cursus LLP', category: 'Clinical Medicine',  subcategory:'', codeCountry:'la', country: 'Laos', score: 156},
  {position: 8, name: 'Marc Ruiz', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Ut Sem LLP', category: 'Physics',  subcategory:'Applied Mathematics',codeCountry:'tg', country: 'Togo', score: 106},
  {position: 9, name: 'Andres Agudelo', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es',university: 'Scelerisque Consulting', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence',codeCountry:'tg', country: 'Togo', score: 96},
  {position: 10,name: 'Andres Beeckman', profile:'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Morbi Metus Ltd', category: 'Information & Communication on Technologies',  subcategory:'Artificial Intelligence',codeCountry:'fk', country: 'Falkland Islands', score: 86},
];


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  formGroup: FormGroup;

  test: RankingTest[] = [];
  categories: any[] = [];
  countries: any[] = [];
  /* cols: Colm[] = []; */
  cols: string[] = [];
  selectedCol: string = "";
  clearField: string = "";
  clearField2: string = "";

  //miga de pan
  breadcrumbs: Array<{ label: string, url: string }> = [];

  //table

  rankings: Ranking[] = [];
  dataSource = ELEMENT_DATA;
  dataSource2 = ELEMENT_DATA2;

  loading: boolean = true;

  activityValues: number[] = [0, 100];


  constructor(private breadcrumbService: BreadcrumbService, private customerService: CustomerserviceService, private rankingService: RankingserviceService, private translate: TranslateService, private testService: TestServiceService) {
    this.formGroup = new FormGroup({
      city: new FormControl<any | null>(null)
    });
  }

  ngOnInit(): void {
    this.cols = ['Name', 'University', 'home_table_rank_category','SubCategory', 'Country'];
    this.selectedCol='Name'
   /*  this.cols=[
      { label: 'Full Name' },
      { label: 'Category' },
      { label: 'SubCategory' },
      { label: 'Country' },
    ]; */

    //test
    this.testService.getRanking()
      .subscribe(
        {
        next:(test2: any) => {
          this.test = test2;
          /* console.log(this.test) */
          this.loading=false;
        },
        error: (err: any) => {
          console.error(err);
        },
        complete: () => {
          /* console.log("Completed") */
        }
      }
    );

    //miga de pan
    this.breadcrumbs = this.breadcrumbService.breadcrumbs;

    //table
    /* this.getRankings(2023);

    this.rankingService.getYear(2023).subscribe(
      data => this.rankings = data
    ); */
    this.categories = [
      { label: 'Information & Communication Technologies', value: 'Information & Communication Technologies' },
      { label: 'Enabling & Strategic Technologies', value: 'Enabling & Strategic Technologies' },
      { label: 'Biology', value: 'Biology' },
      { label: 'Public Health & Health Services', value: 'Public Health & Health Services' },
      { label: 'Physics & Astronomy', value: 'Physics & Astronomy' },
      { label: 'Clinical Medicine', value: 'Clinical Medicine' },
      { label: 'Mathematics & Statistics', value: 'Mathematics & Statistics' },
      { label: 'Agriculture, Fisheries & Forestry', value: 'Agriculture, Fisheries & Forestry' }
    ];

    this.countries = [
      { label:'Algeria', value:'Algeria' },
      { label:'Egypt', value:'Egypt' },
      { label:'Iraq', value:'Iraq' },
      { label:'Jordan', value:'Jordan' },
      { label:'Kuwait', value:'Kuwait' },
      { label:'Lebanon', value:'Lebanon' },
      { label:'Libya', value:'Libya' },
      { label:'Morocco', value:'Morocco' },
      { label:'Oman', value:'Oman' },
      { label:'Palestine', value:'Palestine' },
      { label:'Qatar', value:'Qatar' },
      { label:'Saudi Arabia', value:'Saudi Arabia' },
      { label:'Sudan', value:'Sudan' },
      { label:'Syria', value:'Syria' },
      { label:'Tunisia', value:'Tunisia' },
      { label:'United Arab Emirates', value:'United Arab Emirates' },
      { label:'Yemen', value:'Yemen' }
    ];
  }

  chOpt($event:any) {
    console.log($event.target.value);
  }

  /* getRankings(year: number): any{
    this.rankingService.getRankingLarge(year);
    this.loading = false;
  }*/

  clear(table: Table) {
      table.clear();
      this.clearField ="";
      this.clearField2 ="";
  }
}
