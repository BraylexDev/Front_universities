import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../service/breadcrumb/breadcrumb.service';

/* modal filter */
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


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

import { FilterMetadata } from 'primeng/api';


/* fields table */
interface Category {
  name: string;
  subcategory: string[];
}

interface Country {
  name: string;
  code: string;
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
  profile: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, university: 'Suspendisse Aliquet Institute', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'tg', country: 'Togo', score: 256 },
  { position: 2, university: 'Aenean Eget Metus Corp', category: 'Economics and Business', subcategory: ' ', codeCountry: 'uz', country: 'uzbekistán', score: 230 },
  { position: 3, university: 'Molestie Dapibus Ligula Foundation', category: 'Social Sciences', subcategory: '', codeCountry: 'ir', country: 'Irán', score: 222 },
  { position: 4, university: 'Non Luctus Sit Incorporated', category: 'Physics', subcategory: 'Applied Mathematics', codeCountry: 'bg', country: 'Bulgaria', score: 210 },
  { position: 5, university: 'Ullamcorper Velit In Institute', category: 'Neuroscience', subcategory: '', codeCountry: 'bg', country: 'Bulgaria', score: 203 },
  { position: 6, university: 'Ut Odio LLC', category: 'Geosciences', subcategory: ' ', codeCountry: 'bn', country: 'Brunei', score: 170 },
  { position: 7, university: 'Cursus LLP', category: 'Clinical Medicine', subcategory: '', codeCountry: 'la', country: 'Laos', score: 156 },
  { position: 8, university: 'Ut Sem LLP', category: 'Physics', subcategory: 'Applied Mathematics', codeCountry: 'tg', country: 'Togo', score: 106 },
  { position: 9, university: 'Scelerisque Consulting', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'tg', country: 'Togo', score: 96 },
  { position: 10, university: 'Morbi Metus Ltd', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'fk', country: 'Falkland Islands', score: 86 },
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  { position: 1, name: 'Andres Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Suspendisse Aliquet Institute', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'tg', country: 'Togo', score: 256 },
  { position: 2, name: 'Felipe Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Aenean Eget Metus Corp', category: 'Economics and Business', subcategory: ' ', codeCountry: 'uz', country: 'uzbekistán', score: 230 },
  { position: 3, name: 'Andres Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Molestie Dapibus Ligula Foundation', category: 'Social Sciences', subcategory: '', codeCountry: 'ir', country: 'Irán', score: 222 },
  { position: 4, name: 'Felipe Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Non Luctus Sit Incorporated', category: 'Physics', subcategory: 'Applied Mathematics', codeCountry: 'bg', country: 'Bulgaria', score: 210 },
  { position: 5, name: 'Andres Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Ullamcorper Velit In Institute', category: 'Neuroscience', subcategory: '', codeCountry: 'bg', country: 'Bulgaria', score: 203 },
  { position: 6, name: 'Carlos Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Ut Odio LLC', category: 'Geosciences', subcategory: ' ', codeCountry: 'bn', country: 'Brunei', score: 170 },
  { position: 7, name: 'Andres Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Cursus LLP', category: 'Clinical Medicine', subcategory: '', codeCountry: 'la', country: 'Laos', score: 156 },
  { position: 8, name: 'Marc Ruiz', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Ut Sem LLP', category: 'Physics', subcategory: 'Applied Mathematics', codeCountry: 'tg', country: 'Togo', score: 106 },
  { position: 9, name: 'Andres Agudelo', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Scelerisque Consulting', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'tg', country: 'Togo', score: 96 },
  { position: 10, name: 'Andres Beeckman', profile: 'https://scholar.google.es/citations?user=164ZzUIAAAAJ&hl=es', university: 'Morbi Metus Ltd', category: 'Information & Communication on Technologies', subcategory: 'Artificial Intelligence', codeCountry: 'fk', country: 'Falkland Islands', score: 86 },
];


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  @Input() filters: { [s: string]: FilterMetadata | FilterMetadata[] | undefined } = {};

  selectedCountry: Country | undefined;
  selectedCategory: Category | undefined;
  selectedSubcategory: string = '';
  visible!: boolean;

  showDialog() {
    this.visible = true;
  }
  /* Scroll to top */
  @Output() scrollToTop = new EventEmitter<void>();

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }

  test: RankingTest[] = [];
  cats: any[] = [];
  categories: Category[] = [];
  countries: Country[] = [];
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
  }

  /* modal filter */
  /* End modal filter */

  ngOnInit(): void {

    this.onScrollToTop();

    this.cols = ['Name', 'University', 'Category', 'SubCategory', 'Country'];
    this.cats = ['Agriculture, Fisheries & Forestry', 'Biology', 'Biomedical Research', 'Built Environment & Design', 'Chemistry', 'Clinical Medicine', 'Communication & Textual Studies', 'Earth & Environmental Sciences', 'Economics & Business', 'Enabling & Strategic Technologies', 'Engineering', 'Historical Studies', 'Information & Communication Technologies', 'Mathematics & Statistics', 'Physics & Astronomy', 'Psychology & Cognitive Sciences', 'Public Health & Health Services', 'Social Sciences'];

    this.selectedCol = 'Name'

    //test
    this.testService.getRanking()
      .subscribe(
        {
          next: (test2: any) => {
            this.test = test2;
            /* console.log(this.test) */
            this.loading = false;
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
      { name: 'Agriculture, Fisheries & Forestry', subcategory: ['Dairy & Animal Science', 'Fisheries', 'Food Science', 'Plant Biology & Botany', 'Agronomy & Agriculture', 'Veterinary Sciences', 'Environmental Engineering', 'Tropical Medicine', 'Forestry', 'Oncology & Carcinogenesis', 'Mycology & Parasitology'] },
      { name: 'Biology', subcategory: ['Plant Biology & Botany', 'Marine Biology & Hydrobiology', 'Polymers', 'Environmental Sciences', 'Developmental Biology', 'Entomology', 'Ecology', 'Microbiology', 'Oncology & Carcinogenesis', 'Zoology', 'Horticulture', 'Ornithology'] },
      { name: 'Biomedical Research', subcategory: ['Microbiology', 'Nutrition & Dietetics', 'Plant Biology & Botany', 'Toxicology', 'Biochemistry & Molecular Biology', 'Developmental Biology', 'Mycology & Parasitology', 'Biophysics', 'Surgery', 'Food Science', 'Applied Mathematics', 'General Clinical Medicine', 'Mycology & Parasitology', 'Environmental Sciences', 'Virology', 'Oncology & Carcinogenesis', 'Software Engineering', 'General Mathematics', 'Immunology', 'Pharmacology & Pharmacy', 'Bioinformatics', 'Veterinary Sciences', 'Tropical Medicine', 'Microscopy', 'Anatomy & Morphology', 'Physiology', 'Genetics & Heredity'], },
      { name: 'Built Environment & Design', subcategory: ['Building & Construction', 'Design Practice & Management', 'Urban & Regional Planning'] },
      { name: 'Chemistry', subcategory: ['Inorganic & Nuclear Chemistry', 'Analytical Chemistry', 'Polymers', 'Medicinal & Biomolecular Chemistry', 'Organic Chemistry', 'Chemical Physics', 'Materials', 'Applied Physics', 'Environmental Sciences', 'Physical Chemistry', 'Dairy & Animal Science', 'Plant Biology & Botany', 'Biotechnology', 'Microbiology', 'General Chemistry', 'Pharmacology & Pharmacy', 'Chemical Engineering', 'Biophysics', 'Food Science', 'Complementary & Alternative Medicine', 'Developmental Biology', 'Mycology & Parasitology', 'Biochemistry & Molecular Biology', 'General Physics'] },
      { name: 'Clinical Medicine', subcategory: ['Allergy', 'Anatomy & Morphology', 'Anesthesiology', 'Arthritis & Rheumatology', 'Biochemistry & Molecular Biology', 'Biomedical Engineering', 'Biotechnology', 'Cardiovascular System & Hematology', 'Chemical Physics', 'Complementary & Alternative Medicine', 'Dairy & Animal Science', 'Dentistry', 'Dermatology & Venereal Diseases', 'Developmental & Child Psychology', 'Developmental Biology', 'Emergency & Critical Care Medicine', 'Endocrinology & Metabolism', 'Environmental Sciences', 'Food Science', 'Gastroenterology & Hepatology', 'General & Internal Medicine', 'General Clinical Medicine', 'General Physics', 'Genetics & Heredity', 'Health Policy & Services', 'Immunology', 'Legal & Forensic Medicine', 'Materials', 'Medical Informatics', 'Medicinal & Biomolecular Chemistry', 'Microbiology', 'Mycology & Parasitology', 'Neurology & Neurosurgery', 'Nuclear Medicine & Medical Imaging', 'Nursing', 'Nutrition & Dietetics', 'Obstetrics & Reproductive Medicine', 'Oncology & Carcinogenesis', 'Ophthalmology & Optometry', 'Organic Chemistry', 'Orthopedics', 'Otorhinolaryngology', 'Pathology', 'Pediatrics', 'Pharmacology & Pharmacy', 'Physiology', 'Plant Biology & Botany', 'Psychiatry', 'Public Health', 'Rehabilitation', 'Respiratory System', 'Sport Sciences', 'Strategic, Defence & Security Studies', 'Surgery', 'Toxicology', 'Tropical Medicine', 'Urology & Nephrology', 'Veterinary Sciences', 'Virology'] },
      { name: 'Communication & Textual Studies', subcategory: ['Languages & Linguistics', 'Literary Studies'] },
      { name: 'Earth & Environmental Sciences', subcategory: ['Aerospace & Aeronautics', 'Agronomy & Agriculture', 'Analytical Chemistry', 'Archaeology', 'Artificial Intelligence & Image Processing', 'Biotechnology', 'Business & Management', 'Chemical Engineering', 'Chemical Physics', 'Dairy & Animal Science', 'Economics', 'Endocrinology & Metabolism', 'Energy', 'Environmental Engineering', 'Environmental Sciences', 'Geochemistry & Geophysics', 'Geography', 'Geological & Geomatics Engineering', 'Geology', 'Marine Biology & Hydrobiology', 'Materials', 'Meteorology & Atmospheric Sciences', 'Networking & Telecommunications', 'Polymers', 'Sport, Leisure & Tourism', 'Strategic, Defence & Security Studies', 'Toxicology'] },
      { name: 'Economics & Business', subcategory: ['Accounting', 'Agricultural Economics & Policy', 'Artificial Intelligence & Image Processing', 'Business & Management', 'Economics', 'Education', 'Energy', 'Finance', 'Logistics & Transportation', 'Marketing', 'Operations Research', 'Sport, Leisure & Tourism'] },
      { name: 'Enabling & Strategic Technologies', subcategory: ['Applied Physics', 'Artificial Intelligence & Image Processing', 'Bioinformatics', 'Biotechnology', 'Building & Construction', 'Chemical Engineering', 'Chemical Physics', 'Electrical & Electronic Engineering', 'Energy', 'Environmental Sciences', 'Fluids & Plasmas', 'General Physics', 'Languages & Linguistics', 'Materials', 'Mechanical Engineering & Transports', 'Meteorology & Atmospheric Sciences', 'Mining & Metallurgy', 'Nanoscience & Nanotechnology', 'Networking & Telecommunications', 'Optoelectronics & Photonics', 'Plant Biology & Botany', 'Polymers', 'Strategic, Defence & Security Studies'] },
      { name: 'Engineering', subcategory: ['Aerospace & Aeronautics', 'Archaeology', 'Artificial Intelligence & Image Processing', 'Biomedical Engineering', 'Building & Construction', 'Chemical Engineering', 'Civil Engineering', 'Ecology', 'Electrical & Electronic Engineering', 'Energy', 'Environmental Engineering', 'Environmental Sciences', 'Fluids & Plasmas', 'Geological & Geomatics Engineering', 'Industrial Engineering & Automation', 'Materials', 'Mechanical Engineering & Transports', 'Operations Research', 'Urban & Regional Planning'] },
      { name: 'Historical Studies', subcategory: ['Archaeology'] },
      { name: 'Information & Communication Technologies', subcategory: ['Analytical Chemistry', 'Applied Mathematics', 'Artificial Intelligence & Image Processing', 'Business & Management', 'Computation Theory & Mathematics', 'Computer Hardware & Architecture', 'Distributed Computing', 'Education', 'Electrical & Electronic Engineering', 'Energy', 'General & Internal Medicine', 'Industrial Engineering & Automation', 'Information Systems', 'Mechanical Engineering & Transports', 'Medical Informatics', 'Medicinal & Biomolecular Chemistry', 'Networking & Telecommunications', 'Neurology & Neurosurgery', 'Nuclear & Particle Physics', 'Nuclear Medicine & Medical Imaging', 'Operations Research', 'Optics', 'Software Engineering', 'Strategic, Defence & Security Studies', 'Toxicology'] },
      { name: 'Mathematics & Statistics', subcategory: ['Applied Mathematics', 'Artificial Intelligence & Image Processing', 'Fluids & Plasmas', 'General Mathematics', 'General Physics', 'Nuclear & Particle Physics', 'Numerical & Computational Mathematics', 'Operations Research', 'Statistics & Probability'] },
      { name: 'Physics & Astronomy', subcategory: ['Acoustics', 'Applied Mathematics', 'Applied Physics', 'Artificial Intelligence & Image Processing', 'Astronomy & Astrophysics', 'Bioinformatics', 'Chemical Engineering', 'Chemical Physics', 'Electrical & Electronic Engineering', 'Endocrinology & Metabolism', 'Energy', 'Environmental Sciences', 'Fluids & Plasmas', 'General Mathematics', 'General Physics', 'Geochemistry & Geophysics', 'Inorganic & Nuclear Chemistry', 'Materials', 'Mathematical Physics', 'Mechanical Engineering & Transports', 'Networking & Telecommunications', 'Nuclear & Particle Physics', 'Nuclear Medicine & Medical Imaging', 'Optics', 'Optoelectronics & Photonics', 'Polymers'] },
      { name: 'Psychology & Cognitive Sciences', subcategory: ['Business & Management', 'Human Factors', 'Psychiatry', 'Social Psychology'] },
      { name: 'Public Health & Health Services', subcategory: ['General & Internal Medicine', 'Health Policy & Services', 'Nursing', 'Public Health', 'Rehabilitation', 'Substance Abuse'] },
      { name: 'Social Sciences', subcategory: ['Business & Management', 'Education', 'Information & Library Sciences', 'Law', 'Social Sciences Methods'] }
    ]

    this.countries = [
      { name: 'Algeria', code: 'DZ' },
      { name: 'Egypt', code: 'EG' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Libya', code: 'LY' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Oman', code: 'OM' },
      { name: 'Palestine', code: 'PS' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Sudan', code: 'SS' },
      { name: 'Syria', code: 'SY' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'Yemen', code: 'YE' }
    ];
  }

  /* getRankings(year: number): any{
    this.rankingService.getRankingLarge(year);
    this.loading = false;
  }*/

  clear(table: Table) {
    table.clear();
    table.filter('', 'country', 'equals');
    table.filter('', 'category', 'equals');
    table.filter('', 'subcategory', 'equals');
    this.selectedCountry = undefined;
    this.selectedCategory = undefined;
    this.selectedSubcategory = '';
    this.clearField2 = '';
  }
}
