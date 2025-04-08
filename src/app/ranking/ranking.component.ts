import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreadcrumbService } from '../service/breadcrumb/breadcrumb.service';

/* modal filter */
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


//table
import { CodeCountry, Customer, Representative } from '../domain/customer';
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

interface CountryUniversity{
    country: string;
    code: string;
    universities: string[];
}

interface Country {
  name: string;
  code: string;
}
interface University {
  name: string;
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

  selectedLastCountry: Country | undefined;
  selectedCountry: University | undefined;

  selectedCountryUniversity: CountryUniversity | undefined; 
  selectedInstitucion: string = '';
  
  selectedCategory: Category | undefined;
  selectedSubcategory: string = '';

  visible!: boolean;
  isfilterArabResearch:boolean = false;

  showDialog() {
    this.visible = true;
  }
  /* Scroll to top */
  @Output() scrollToTop = new EventEmitter<void>();

  onScrollToTop(): void {
    this.scrollToTop.emit();
  }

  test: RankingTest[] = [];
  testAux: RankingTest[] = [];
  cats: any[] = [];
  categories: Category[] = [];
  countries: Country[] = [];
  
  countryUniversity: CountryUniversity[] = [];

  codesCountries: CodeCountry[] = [];
  arabCountries: string[] = [];
  universities: University[] = [];
  universities2: string[] = [];
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

    this.cols = ['Name', 'University', 'Category', 'SubCategory', 'Country', 'LastCountry'];
    this.cats = ['Agriculture, Fisheries & Forestry', 'Biology', 'Biomedical Research', 'Built Environment & Design', 'Chemistry', 'Clinical Medicine', 'Communication & Textual Studies', 'Earth & Environmental Sciences', 'Economics & Business', 'Enabling & Strategic Technologies', 'Engineering', 'Historical Studies', 'Information & Communication Technologies', 'Mathematics & Statistics', 'Physics & Astronomy', 'Psychology & Cognitive Sciences', 'Public Health & Health Services', 'Social Sciences'];

    this.selectedCol = 'Name'

    //test
    /* this.testService.getRanking()
      .subscribe(
        data => {
          this.test = data.slice(0,1000);
        }
      ); */
    this.testService.getRanking()
      .subscribe(
        {
          next: (test2: any) => {

            this.test = test2.slice(0, 1000);
            this.changeCodeCountry();
            this.specifyNameCountry();
            this.testAux=this.test;
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

    /* this.categories = [
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
    ] */

    /* VErsion archivo 2025 marzo 2 */  
    this.categories = [
        { name: "Agriculture, Fisheries & Forestry", subcategory: ["Food Science","Plant Biology & Botany","Nutrition & Dietetics","Dairy & Animal Science","Fisheries","Agronomy & Agriculture","Veterinary Sciences","Environmental Engineering","Toxicology","Microbiology"] },
        { name: "Biology", subcategory: ["Plant Biology & Botany","Marine Biology & Hydrobiology","Entomology","Ecology","Zoology","Microbiology","Environmental Sciences","Agronomy & Agriculture"] },
        { name: "Biomedical Research", subcategory: ["Microbiology","Biochemistry & Molecular Biology","Mycology & Parasitology","Veterinary Sciences","Pharmacology & Pharmacy","Microscopy","Immunology","Toxicology","Virology","Analytical Chemistry","Developmental Biology","Anatomy & Morphology","General & Internal Medicine","Nutrition & Dietetics","Organic Chemistry","Food Science","Plant Biology & Botany","Biophysics","Genetics & Heredity","Oncology & Carcinogenesis"] },
        { name: "Built Environment & Design", subcategory: ["Building & Construction"] },
        { name: "Chemistry", subcategory: ["Polymers","Medicinal & Biomolecular Chemistry","Organic Chemistry","Chemical Physics","Physical Chemistry","Materials","Inorganic & Nuclear Chemistry","Analytical Chemistry","Biotechnology","Dairy & Animal Science","Artificial Intelligence & Image Processing","Environmental Sciences","Microbiology","Nanoscience & Nanotechnology","General Chemistry","Biochemistry & Molecular Biology","Pharmacology & Pharmacy","Plant Biology & Botany","Applied Physics","Chemical Engineering","Food Science","Energy"] },
        { name: "Clinical Medicine", subcategory: ["Immunology","Nutrition & Dietetics","Endocrinology & Metabolism","Neurology & Neurosurgery","Pharmacology & Pharmacy","Dentistry","Oncology & Carcinogenesis","Biochemistry & Molecular Biology","Chemical Physics","General & Internal Medicine","Microbiology","Environmental Sciences","Toxicology","Veterinary Sciences","Public Health","Organic Chemistry","Gastroenterology & Hepatology","Surgery","Dairy & Animal Science","Arthritis & Rheumatology","Rehabilitation","Nuclear Medicine & Medical Imaging","Anesthesiology","Pediatrics","Obstetrics & Reproductive Medicine","Urology & Nephrology","Ophthalmology & Optometry","Biomedical Engineering","Orthopedics","Cardiovascular System & Hematology","Developmental Biology","Psychiatry","Dermatology & Venereal Diseases","Virology","Respiratory System","Anatomy & Morphology","Otorhinolaryngology","Pathology","General Physics","Plant Biology & Botany","Emergency & Critical Care Medicine","Medicinal & Biomolecular Chemistry","Food Science","Sport Sciences","Medical Informatics","Biotechnology","Zoology","Nursing","Tropical Medicine","General Clinical Medicine"] },
        { name: "Communication & Textual Studies", subcategory: ["Languages & Linguistics"] },
        { name: "Earth & Environmental Sciences", subcategory: ["Geochemistry & Geophysics","Environmental Engineering","Environmental Sciences","Ecology","Geology","Paleontology","Civil Engineering","Energy","Meteorology & Atmospheric Sciences"] },
        { name: "Economics & Business", subcategory: ["Business & Management","Finance","Economics","Agricultural Economics & Policy","Energy","Education"] },
        { name: "Enabling & Strategic Technologies", subcategory: ["Energy","Materials","Nanoscience & Nanotechnology","Environmental Sciences","Applied Physics","Mechanical Engineering & Transports","Inorganic & Nuclear Chemistry","Industrial Engineering & Automation","Biotechnology","Optoelectronics & Photonics","Chemical Engineering","Polymers","Plant Biology & Botany","Nuclear & Particle Physics","Chemical Physics","General Physics","Building & Construction","Artificial Intelligence & Image Processing","Electrical & Electronic Engineering","Bioinformatics"] },
        { name: "Engineering", subcategory: ["Mechanical Engineering & Transports","Chemical Engineering","Industrial Engineering & Automation","Electrical & Electronic Engineering","Environmental Engineering","Operations Research","Geological & Geomatics Engineering","Aerospace & Aeronautics","Civil Engineering","Materials","Building & Construction","Energy","Logistics & Transportation","Environmental Sciences","General Physics","Plant Biology & Botany","General Chemistry","Biomedical Engineering","Artificial Intelligence & Image Processing","Agronomy & Agriculture"] },
        { name: "Historical Studies", subcategory: ["Archaeology"] },
        { name: "Information & Communication Technologies", subcategory: ["Artificial Intelligence & Image Processing","Networking & Telecommunications","Education","Biomedical Engineering","Operations Research","Energy","Applied Mathematics","Nuclear Medicine & Medical Imaging","Toxicology","Nuclear & Particle Physics","Geological & Geomatics Engineering","Optoelectronics & Photonics","Electrical & Electronic Engineering","Computation Theory & Mathematics","Strategic, Defence & Security Studies","Information Systems","Statistics & Probability","Business & Management","Software Engineering"] },
        { name: "Mathematics & Statistics", subcategory: ["Numerical & Computational Mathematics","General Mathematics","Applied Mathematics","Statistics & Probability","Operations Research","Fluids & Plasmas"] },
        { name: "Physics & Astronomy", subcategory: ["Applied Physics","Optics","General Physics","Energy","Environmental Sciences","Materials","Fluids & Plasmas","Electrical & Electronic Engineering","Nuclear & Particle Physics","Applied Mathematics","Chemical Physics","Mechanical Engineering & Transports","Nuclear Medicine & Medical Imaging","Optoelectronics & Photonics","Analytical Chemistry","Astronomy & Astrophysics","Acoustics","Networking & Telecommunications","Geochemistry & Geophysics","Plant Biology & Botany","Artificial Intelligence & Image Processing","General Mathematics"] },
        { name: 'Psychology & Cognitive Sciences', subcategory: ['Business & Management', 'Human Factors', 'Psychiatry', 'Social Psychology'] },
        { name: "Public Health & Health Services", subcategory: ["Nursing","Public Health","General & Internal Medicine"] },
        { name: "Social Sciences", subcategory: ["Education"] }
    ]

    this.universities = [
      {
        name: "A’Sharqiyah University"
      },
      {
          name: "Abu Dhabi University"
      },
      {
          name: "Ain Shams University"
      },
      {
          name: "Ajman University"
      },
      {
          name: "Al Ain University"
      },
      {
          name: "Al Akhawayn University"
      },
      {
          name: "Al Hikma University College"
      },
      {
          name: "Al Yamamah University"
      },
      {
          name: "Al-Ahliyya Amman University"
      },
      {
          name: "Al-Aqsa University"
      },
      {
          name: "Al-Ayen Iraqi University, AUIQ"
      },
      {
          name: "Al-Azhar University"
      },
      {
          name: "Al-Balqa Applied University"
      },
      {
          name: "Al-Bayan University"
      },
      {
          name: "Al-Esraa University"
      },
      {
          name: "Alexandria University"
      },
      {
          name: "Alfaisal University"
      },
      {
          name: "Al-Furat Al-Awsat Technical University"
      },
      {
          name: "Al-Hadi University College"
      },
      {
          name: "Al-Hussein Bin Talal University"
      },
      {
          name: "Al-Imam Muhammad Ibn Saud Islamic University"
      },
      {
          name: "Al-Iraqia University"
      },
      {
          name: "Almaaqal University"
      },
      {
          name: "Al-Mamoon University College"
      },
      {
          name: "Al-Mustaqbal University"
      },
      {
          name: "Al-Muthanna University"
      },
      {
          name: "Al-Nahrain University"
      },
      {
          name: "Al-Qasim Green University"
      },
      {
          name: "Al-Rafidain University College"
      },
      {
          name: "Al-Zahrawi University College"
      },
      {
          name: "Alzaiem Alazhari University"
      },
      {
          name: "Al-Zaytoonah University of Jordan"
      },
      {
          name: "American University of Beirut"
      },
      {
          name: "American University of Sharjah"
      },
      {
          name: "American University of the Middle East"
      },
      {
          name: "Amman Arab University"
      },
      {
          name: "An-Najah National University"
      },
      {
          name: "Applied Science Private University"
      },
      {
          name: "Arab Academy for Science, Technology and Maritime Transport"
      },
      {
          name: "Arish University"
      },
      {
          name: "Aspire Academy"
      },
      {
          name: "Assiut University"
      },
      {
          name: "Aswan University"
      },
      {
          name: "Australian University"
      },
      {
          name: "Badr University in Cairo"
      },
      {
          name: "Beirut Arab University"
      },
      {
          name: "Benha University"
      },
      {
          name: "Beni-Suef University"
      },
      {
          name: "Bilad Alrafidain University College"
      },
      {
          name: "Birzeit University"
      },
      {
          name: "British University in Dubai"
      },
      {
          name: "Cairo University"
      },
      {
          name: "Centre Universitaire Amin Eloukkal El Hadj Moussa Ag Akhamouk Tamanrasset"
      },
      {
          name: "Centre Universitaire Salhi Ahmed -Naama"
      },
      {
          name: "Charmo University"
      },
      {
          name: "Cihan University– Sulaymania"
      },
      {
          name: "Damanhour University"
      },
      {
          name: "Damascus University"
      },
      {
          name: "Damietta University"
      },
      {
          name: "Delta University for Science and Technology"
      },
      {
          name: "Dhofar University"
      },
      {
          name: "Dijlah University College"
      },
      {
          name: "Duhok Polytechnic University"
      },
      {
          name: "École Militaire Polytechnique"
      },
      {
          name: "Ecole Nationale d'Agriculture"
      },
      {
          name: "Ecole Nationale Polytechnique"
      },
      {
          name: "École Nationale Supérieure Agronomique – Kasdi Merbah"
      },
      {
          name: "École Nationale Supérieure des Télécommunications et des Technologies de l'Information et de la Communication"
      },
      {
          name: "École Supérieure des Sciences de l’Aliment et des Industries Agroalimentaires"
      },
      {
          name: "Effat University, Saudi Arabia"
      },
      {
          name: "Egyptian Russian University"
      },
      {
          name: "Egypt-Japan University of Science and Technology"
      },
      {
          name: "Erbil Polytechnic University"
      },
      {
          name: "European University College, Dubai"
      },
      {
          name: "Fahad Bin Sultan University"
      },
      {
          name: "Fayoum University"
      },
      {
          name: "Future University in Egypt"
      },
      {
          name: "Galala University"
      },
      {
          name: "German Jordanian University"
      },
      {
          name: "German University in Cairo"
      },
      {
          name: "Gulf College, Muscat"
      },
      {
          name: "Hashemite University"
      },
      {
          name: "Hassan II University of Casablanca"
      },
      {
          name: "Hawler Medical University"
      },
      {
          name: "Helwan University"
      },
      {
          name: "Higher Colleges of Technology"
      },
      {
          name: "Hodeida University"
      },
      {
          name: "Holy Spirit University of Kaslik (USEK)"
      },
      {
          name: "Horus University - Egypt"
      },
      {
          name: "Imam Abdulrahman Bin Faisal University"
      },
      {
          name: "Imam Ja'afar Al-Sadiq University"
      },
      {
          name: "International University of Rabat"
      },
      {
          name: "Iraq University College"
      },
      {
          name: "Islamic University of Gaza"
      },
      {
          name: "Isra University"
      },
      {
          name: "Jadara University"
      },
      {
          name: "Jazan University"
      },
      {
          name: "Jordan University of Science and Technology"
      },
      {
          name: "Jouf University"
      },
      {
          name: "Kafrelsheikh University"
      },
      {
          name: "Khalifa University of Science and Technology"
      },
      {
          name: "Khartoum University"
      },
      {
          name: "King Abdulaziz University"
      },
      {
          name: "King Abdullah Petroleum Studies and Research Center"
      },
      {
          name: "King Abdullah University of Science and Technology"
      },
      {
          name: "King Fahd University of Petroleum and Minerals"
      },
      {
          name: "King Faisal University"
      },
      {
          name: "King Khalid University"
      },
      {
          name: "King Saud bin Abdulaziz University for Health Sciences"
      },
      {
          name: "King Saud University"
      },
      {
          name: "Knowledge University"
      },
      {
          name: "Komar University of Science and Technology"
      },
      {
          name: "Koya University"
      },
      {
          name: "Kuwait College of Science & Technology"
      },
      {
          name: "Kuwait University"
      },
      {
          name: "Lebanese American University"
      },
      {
          name: "Lebanese French University"
      },
      {
          name: "Majmaah University"
      },
      {
          name: "Mansoura University"
      },
      {
          name: "Menoufia University"
      },
      {
          name: "Middle East College"
      },
      {
          name: "Middle East University, Jordan"
      },
      {
          name: "Middle Technical University"
      },
      {
          name: "Minia University"
      },
      {
          name: "Misr International University"
      },
      {
          name: "Misr University for Science and Technology"
      },
      {
          name: "Mohamed Bin Zayed University of Artificial Intelligence"
      },
      {
          name: "Mohammed V University in Rabat"
      },
      {
          name: "Mohammed VI Polytechnic University"
      },
      {
          name: "Mohammed VI University of Sciences and Health - UM6SS"
      },
      {
          name: "MSA University"
      },
      {
          name: "Mustansiriyah University"
      },
      {
          name: "Mutah University"
      },
      {
          name: "Nahda University in Beni Suef"
      },
      {
          name: "Najran University"
      },
      {
          name: "National Council for Scientific Research, Beirut"
      },
      {
          name: "New Valley University"
      },
      {
          name: "Nile University"
      },
      {
          name: "Ninevah University"
      },
      {
          name: "Northern Technical University"
      },
      {
          name: "Omar Al-Mukhtar University"
      },
      {
          name: "Palestine Technical University - Kadoorie"
      },
      {
          name: "Philadelphia University"
      },
      {
          name: "Port Said University"
      },
      {
          name: "Prince Mohammad Bin Fahd University"
      },
      {
          name: "Prince Sattam Bin Abdulaziz University"
      },
      {
          name: "Prince Sultan University"
      },
      {
          name: "Princess Nourah Bint Abdulrahman University"
      },
      {
          name: "Princess Sumaya University"
      },
      {
          name: "Qassim University"
      },
      {
          name: "Qatar University"
      },
      {
          name: "S P Jain School of Global Management"
      },
      {
          name: "Salahaddin University-Erbil"
      },
      {
          name: "Saudi Electronic University"
      },
      {
          name: "Shaqra University"
      },
      {
          name: "Skyline University College"
      },
      {
          name: "Sohag University"
      },
      {
          name: "Sohar University"
      },
      {
          name: "Soran University"
      },
      {
          name: "South Valley University"
      },
      {
          name: "Southern Technical University, Iraq"
      },
      {
          name: "Suez Canal University"
      },
      {
          name: "Suez University"
      },
      {
          name: "Sulaimani Polytechnic University"
      },
      {
          name: "Sultan Qaboos University"
      },
      {
          name: "Tabbin Institute for Metallurgical Studies"
      },
      {
          name: "Tafila Technical University"
      },
      {
          name: "Taibah University"
      },
      {
          name: "Taif University"
      },
      {
          name: "Tanta University"
      },
      {
          name: "The American University in Cairo"
      },
      {
          name: "The British University in Egypt"
      },
      {
          name: "The International University of Beirut"
      },
      {
          name: "The Islamic University, Najaf"
      },
      {
          name: "The University of Jordan"
      },
      {
          name: "Tikrit University"
      },
      {
          name: "Tishk International University"
      },
      {
          name: "Umm Al-Qura University"
      },
      {
          name: "United Arab Emirates University"
      },
      {
          name: "Université 20 Août 1955-Skikda"
      },
      {
          name: "Université 8 Mai 1945 Guelma"
      },
      {
          name: "Université Abbes Laghrour Khenchela"
      },
      {
          name: "Université Abdelhamid Ibn Badis Mostaganem"
      },
      {
          name: "Université Abdelmalek Essaadi"
      },
      {
          name: "Université Abderrahmane Mira - Béjaïa"
      },
      {
          name: "Université Abou Bekr Belkaid Tlemcen"
      },
      {
          name: "Université Ahmed Draia - Adrar"
      },
      {
          name: "Université Ahmed Zabana de Relizane"
      },
      {
          name: "Université Akli Mouhand Oulhadj-Bouira"
      },
      {
          name: "Université Amar Telidji Laghouat"
      },
      {
          name: "Université Badji Mokhtar - Annaba"
      },
      {
          name: "Université Blida 1"
      },
      {
          name: "Université Cadi Ayyad"
      },
      {
          name: "Université Chouaib Doukkali"
      },
      {
          name: "Université Constantine 1"
      },
      {
          name: "Université Constantine 3"
      },
      {
          name: "Université d’Echahid Hamma Lakhdar – El-oued"
      },
      {
          name: "Université de Gabès"
      },
      {
          name: "Université de Gafsa"
      },
      {
          name: "Université de Ghardaia"
      },
      {
          name: "Université de Jendouba"
      },
      {
          name: "Université de Jijel"
      },
      {
          name: "Université de la Manouba"
      },
      {
          name: "Université de Monastir"
      },
      {
          name: "Université de Sousse"
      },
      {
          name: "Université de Tunis"
      },
      {
          name: "Université de Tunis El Manar"
      },
      {
          name: "Université des Sciences et de la Technologie d’Oran Mohamed-Boudiaf"
      },
      {
          name: "Université des Sciences et de la Technologie Houari Boumediene"
      },
      {
          name: "Université Djilali Bounaama Khemis Miliana"
      },
      {
          name: "Université Djillali Liabes de Sidi Bel Abbes"
      },
      {
          name: "Université Dr Taher Moulay Saida - Algeria"
      },
      {
          name: "Université Ferhat Abbas Sétif 1"
      },
      {
          name: "Université Hassan 1er"
      },
      {
          name: "Université Ibn Tofail"
      },
      {
          name: "Université Ibn Zohr"
      },
      {
          name: "Université Ibn-Khaldoun Tiaret"
      },
      {
          name: "Université Kasdi Merbah Ouargla"
      },
      {
          name: "Université Larbi Tébessi - Tébessa"
      },
      {
          name: "Université Libanaise"
      },
      {
          name: "Université Mohamed Boudiaf - M'sila"
      },
      {
          name: "Université Mohamed El Bachir El Ibrahimi de Bordj Bou Arréridj"
      },
      {
          name: "Université Mohamed Khider Biskra"
      },
      {
          name: "Université Mohammed Premier Oujda"
      },
      {
          name: "Université Moulay Ismaïl"
      },
      {
          name: "Université Mouloud Mammeri de Tizi Ouzou"
      },
      {
          name: "Université Mustapha Stambouli de Mascara"
      },
      {
          name: "Université Oran 1"
      },
      {
          name: "Université Oum El Bouaghi"
      },
      {
          name: "Université Saint-Joseph de Beyrouth"
      },
      {
          name: "Université Sidi Mohamed Ben Abdellah"
      },
      {
          name: "Université Sultan Moulay Slimane"
      },
      {
          name: "Université Yahia Farès de Médéa"
      },
      {
          name: "Université Ziane Achour De Djelfa"
      },
      {
          name: "Université Batna 2"
      },
      {
          name: "University Hassiba Benbouali - Chlef"
      },
      {
          name: "University of Al-Ameed"
      },
      {
          name: "University of Al-Qadisiyah"
      },
      {
          name: "University of Anbar"
      },
      {
          name: "University of Babylon"
      },
      {
          name: "University of Baghdad"
      },
      {
          name: "University of Balamand"
      },
      {
          name: "University of Basrah"
      },
      {
          name: "University of Bisha"
      },
      {
          name: "University of Carthage"
      },
      {
          name: "University Of Diyala"
      },
      {
          name: "University of Duhok"
      },
      {
          name: "University of Fallujah"
      },
      {
          name: "University of Garmian"
      },
      {
          name: "University of Hafr Al-Batin"
      },
      {
          name: "University of Ha'il"
      },
      {
          name: "University of Halabja"
      },
      {
          name: "University of Human Development"
      },
      {
          name: "University of Information Technology and Communications"
      },
      {
          name: "University of Jeddah"
      },
      {
          name: "University of Kerbala"
      },
      {
          name: "University of Kirkuk"
      },
      {
          name: "University of Kufa"
      },
      {
          name: "University of Kurdistan Hewlêr"
      },
      {
          name: "University of Misan"
      },
      {
          name: "University of Mosul"
      },
      {
          name: "University of Nizwa"
      },
      {
          name: "University of Petra"
      },
      {
          name: "University of Prince Mugrin"
      },
      {
          name: "University of Raparin"
      },
      {
          name: "University of Sadat City"
      },
      {
          name: "University of Sfax"
      },
      {
          name: "University of Sharjah"
      },
      {
          name: "University of Sulaimani"
      },
      {
          name: "University of Sumer"
      },
      {
          name: "University of Tabuk"
      },
      {
          name: "University of Technology- Iraq"
      },
      {
          name: "University of Thi-Qar"
      },
      {
          name: "University of Zakho"
      },
      {
          name: "Wasit University"
      },
      {
          name: "Yarmouk University"
      },
      {
          name: "Zagazig University"
      },
      {
          name: "Zarqa University"
      },
      {
          name: "Zayed University"
      }
    ]
    
    this.universities2 =[
        "A’Sharqiyah University",
        "Abu Dhabi University",
        "Ain Shams University",
        "Ajman University",
        "Al Ain University",
        "Al Akhawayn University",
        "Al Hikma University College",
        "Al Yamamah University",
        "Al-Ahliyya Amman University",
        "Al-Aqsa University",
        "Al-Ayen Iraqi University, AUIQ",
        "Al-Azhar University",
        "Al-Balqa Applied University",
        "Al-Bayan University",
        "Al-Esraa University",
        "Alexandria University",
        "Alfaisal University",
        "Al-Furat Al-Awsat Technical University",
        "Al-Hadi University College",
        "Al-Hussein Bin Talal University",
        "Al-Imam Muhammad Ibn Saud Islamic University",
        "Al-Iraqia University",
        "Almaaqal University",
        "Al-Mamoon University College",
        "Al-Mustaqbal University",
        "Al-Muthanna University",
        "Al-Nahrain University",
        "Al-Qasim Green University",
        "Al-Rafidain University College",
        "Al-Zahrawi University College",
        "Alzaiem Alazhari University",
        "Al-Zaytoonah University of Jordan",
        "American University of Beirut",
        "American University of Sharjah",
        "American University of the Middle East",
        "Amman Arab University",
        "An-Najah National University",
        "Applied Science Private University",
        "Arab Academy for Science, Technology and Maritime Transport",
        "Arish University",
        "Aspire Academy",
        "Assiut University",
        "Aswan University",
        "Australian University",
        "Badr University in Cairo",
        "Beirut Arab University",
        "Benha University",
        "Beni-Suef University",
        "Bilad Alrafidain University College",
        "Birzeit University",
        "British University in Dubai",
        "Cairo University",
        "Centre Universitaire Amin Eloukkal El Hadj Moussa Ag Akhamouk Tamanrasset",
        "Centre Universitaire Salhi Ahmed -Naama",
        "Charmo University",
        "Cihan University– Sulaymania",
        "Damanhour University",
        "Damascus University",
        "Damietta University",
        "Delta University for Science and Technology",
        "Dhofar University",
        "Dijlah University College",
        "Duhok Polytechnic University",
        "École Militaire Polytechnique",
        "Ecole Nationale d'Agriculture",
        "Ecole Nationale Polytechnique",
        "École Nationale Supérieure Agronomique – Kasdi Merbah",
        "École Nationale Supérieure des Télécommunications et des Technologies de l'Information et de la Communication",
        "École Supérieure des Sciences de l’Aliment et des Industries Agroalimentaires",
        "Effat University, Saudi Arabia",
        "Egyptian Russian University",
        "Egypt-Japan University of Science and Technology",
        "Erbil Polytechnic University",
        "European University College, Dubai",
        "Fahad Bin Sultan University",
        "Fayoum University",
        "Future University in Egypt",
        "Galala University",
        "German Jordanian University",
        "German University in Cairo",
        "Gulf College, Muscat",
        "Hashemite University",
        "Hassan II University of Casablanca",
        "Hawler Medical University",
        "Helwan University",
        "Higher Colleges of Technology",
        "Hodeida University",
        "Holy Spirit University of Kaslik (USEK)",
        "Horus University - Egypt",
        "Imam Abdulrahman Bin Faisal University",
        "Imam Ja'afar Al-Sadiq University",
        "International University of Rabat",
        "Iraq University College",
        "Islamic University of Gaza",
        "Isra University",
        "Jadara University",
        "Jazan University",
        "Jordan University of Science and Technology",
        "Jouf University",
        "Kafrelsheikh University",
        "Khalifa University of Science and Technology",
        "Khartoum University",
        "King Abdulaziz University",
        "King Abdullah Petroleum Studies and Research Center",
        "King Abdullah University of Science and Technology",
        "King Fahd University of Petroleum and Minerals",
        "King Faisal University",
        "King Khalid University",
        "King Saud bin Abdulaziz University for Health Sciences",
        "King Saud University",
        "Knowledge University",
        "Komar University of Science and Technology",
        "Koya University",
        "Kuwait College of Science & Technology",
        "Kuwait University",
        "Lebanese American University",
        "Lebanese French University",
        "Majmaah University",
        "Mansoura University",
        "Menoufia University",
        "Middle East College",
        "Middle East University, Jordan",
        "Middle Technical University",
        "Minia University",
        "Misr International University",
        "Misr University for Science and Technology",
        "Mohamed Bin Zayed University of Artificial Intelligence",
        "Mohammed V University in Rabat",
        "Mohammed VI Polytechnic University",
        "Mohammed VI University of Sciences and Health - UM6SS",
        "MSA University",
        "Mustansiriyah University",
        "Mutah University",
        "Nahda University in Beni Suef",
        "Najran University",
        "National Council for Scientific Research, Beirut",
        "New Valley University",
        "Nile University",
        "Ninevah University",
        "Northern Technical University",
        "Omar Al-Mukhtar University",
        "Palestine Technical University - Kadoorie",
        "Philadelphia University",
        "Port Said University",
        "Prince Mohammad Bin Fahd University",
        "Prince Sattam Bin Abdulaziz University",
        "Prince Sultan University",
        "Princess Nourah Bint Abdulrahman University",
        "Princess Sumaya University",
        "Qassim University",
        "Qatar University",
        "S P Jain School of Global Management",
        "Salahaddin University-Erbil",
        "Saudi Electronic University",
        "Shaqra University",
        "Skyline University College",
        "Sohag University",
        "Sohar University",
        "Soran University",
        "South Valley University",
        "Southern Technical University, Iraq",
        "Suez Canal University",
        "Suez University",
        "Sulaimani Polytechnic University",
        "Sultan Qaboos University",
        "Tabbin Institute for Metallurgical Studies",
        "Tafila Technical University",
        "Taibah University",
        "Taif University",
        "Tanta University",
        "The American University in Cairo",
        "The British University in Egypt",
        "The International University of Beirut",
        "The Islamic University, Najaf",
        "The University of Jordan",
        "Tikrit University",
        "Tishk International University",
        "Umm Al-Qura University",
        "United Arab Emirates University",
        "Université 20 Août 1955-Skikda",
        "Université 8 Mai 1945 Guelma",
        "Université Abbes Laghrour Khenchela",
        "Université Abdelhamid Ibn Badis Mostaganem",
        "Université Abdelmalek Essaadi",
        "Université Abderrahmane Mira - Béjaïa",
        "Université Abou Bekr Belkaid Tlemcen",
        "Université Ahmed Draia - Adrar",
        "Université Ahmed Zabana de Relizane",
        "Université Akli Mouhand Oulhadj-Bouira",
        "Université Amar Telidji Laghouat",
        "Université Badji Mokhtar - Annaba",
        "Université Blida 1",
        "Université Cadi Ayyad",
        "Université Chouaib Doukkali",
        "Université Constantine 1",
        "Université Constantine 3",
        "Université d’Echahid Hamma Lakhdar – El-oued",
        "Université de Gabès",
        "Université de Gafsa",
        "Université de Ghardaia",
        "Université de Jendouba",
        "Université de Jijel",
        "Université de la Manouba",
        "Université de Monastir",
        "Université de Sousse",
        "Université de Tunis",
        "Université de Tunis El Manar",
        "Université des Sciences et de la Technologie d’Oran Mohamed-Boudiaf",
        "Université des Sciences et de la Technologie Houari Boumediene",
        "Université Djilali Bounaama Khemis Miliana",
        "Université Djillali Liabes de Sidi Bel Abbes",
        "Université Dr Taher Moulay Saida - Algeria",
        "Université Ferhat Abbas Sétif 1",
        "Université Hassan 1er",
        "Université Ibn Tofail",
        "Université Ibn Zohr",
        "Université Ibn-Khaldoun Tiaret",
        "Université Kasdi Merbah Ouargla",
        "Université Larbi Tébessi - Tébessa",
        "Université Libanaise",
        "Université Mohamed Boudiaf - M'sila",
        "Université Mohamed El Bachir El Ibrahimi de Bordj Bou Arréridj",
        "Université Mohamed Khider Biskra",
        "Université Mohammed Premier Oujda",
        "Université Moulay Ismaïl",
        "Université Mouloud Mammeri de Tizi Ouzou",
        "Université Mustapha Stambouli de Mascara",
        "Université Oran 1",
        "Université Oum El Bouaghi",
        "Université Saint-Joseph de Beyrouth",
        "Université Sidi Mohamed Ben Abdellah",
        "Université Sultan Moulay Slimane",
        "Université Yahia Farès de Médéa",
        "Université Ziane Achour De Djelfa",
        "Université Batna 2",
        "University Hassiba Benbouali - Chlef",
        "University of Al-Ameed",
        "University of Al-Qadisiyah",
        "University of Anbar",
        "University of Babylon",
        "University of Baghdad",
        "University of Balamand",
        "University of Basrah",
        "University of Bisha",
        "University of Carthage",
        "University Of Diyala",
        "University of Duhok",
        "University of Fallujah",
        "University of Garmian",
        "University of Hafr Al-Batin",
        "University of Ha'il",
        "University of Halabja",
        "University of Human Development",
        "University of Information Technology and Communications",
        "University of Jeddah",
        "University of Kerbala",
        "University of Kirkuk",
        "University of Kufa",
        "University of Kurdistan Hewlêr",
        "University of Misan",
        "University of Mosul",
        "University of Nizwa",
        "University of Petra",
        "University of Prince Mugrin",
        "University of Raparin",
        "University of Sadat City",
        "University of Sfax",
        "University of Sharjah",
        "University of Sulaimani",
        "University of Sumer",
        "University of Tabuk",
        "University of Technology- Iraq",
        "University of Thi-Qar",
        "University of Zakho",
        "Wasit University",
        "Yarmouk University",
        "Zagazig University",
        "Zarqa University",
        "Zayed University"
    ]

    this.arabCountries = [
      "Algeria",
      "Egypt",
      "Iraq",
      "Jordan",
      "Kuwait",
      "Lebanon",
      "Libya",
      "Mauritania",
      "Morocco",
      "Oman",
      "Palestine",
      "Qatar",
      "Saudi Arabia",
      "Somalia",
      "Sudan",
      "Syria",
      "Tunisia",
      "United Arab Emirates",
      "Yemen",
    ]

    this.countries = [
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
    ]

    this.codesCountries = [
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
    ]

    this.countryUniversity = [      
        { country: "Algeria", code: "dz", universities: [ "Centre Universitaire Amin Eloukkal El Hadj Moussa Ag Akhamouk Tamanrasset", "Centre Universitaire Salhi Ahmed -Naama", "Ecole Nationale Polytechnique", "University Hassiba Benbouali - Chlef", "Université 20 Août 1955-Skikda", "Université 8 Mai 1945 Guelma", "Université Abbes Laghrour Khenchela", "Université Abdelhamid Ibn Badis Mostaganem", "Université Abderrahmane Mira - Béjaïa", "Université Abou Bekr Belkaid Tlemcen", "Université Ahmed Draia - Adrar", "Université Ahmed Zabana de Relizane", "Université Akli Mouhand Oulhadj-Bouira", "Université Amar Telidji Laghouat", "Université Badji Mokhtar - Annaba", "Université Blida 1", "Université Constantine 1", "Université Constantine 3", "Université Djilali Bounaama Khemis Miliana", "Université Djillali Liabes de Sidi Bel Abbes", "Université Dr Taher Moulay Saida - Algeria", "Université Ferhat Abbas Sétif 1", "Université Ibn-Khaldoun Tiaret", "Université Kasdi Merbah Ouargla", "Université Larbi Tébessi - Tébessa", "Université Mohamed Boudiaf - M'sila", "Université Mohamed El Bachir El Ibrahimi de Bordj Bou Arréridj", "Université Mohamed Khider Biskra", "Université Mouloud Mammeri de Tizi Ouzou", "Université Mustapha Stambouli de Mascara", "Université Oran 1", "Université Oum El Bouaghi", "Université Yahia Farès de Médéa", "Université Ziane Achour De Djelfa", "Université de Ghardaia", "Université de Jijel", "Université des Sciences et de la Technologie Houari Boumediene", "Université des Sciences et de la Technologie d’Oran Mohamed-Boudiaf", "Université d’Echahid Hamma Lakhdar – El-oued", "Université Batna 2", "École Militaire Polytechnique", "École Nationale Supérieure Agronomique – Kasdi Merbah", "École Nationale Supérieure des Télécommunications et des Technologies de l'Information et de la Communication", "École Supérieure des Sciences de l’Aliment et des Industries Agroalimentaires" ] },
        { country: "Egypt", code: "eg", universities: [ "Ain Shams University", "Al-Azhar University", "Alexandria University", "Arab Academy for Science, Technology and Maritime Transport", "Arish University", "Assiut University", "Aswan University", "Badr University in Cairo", "Benha University", "Beni-Suef University", "Cairo University", "Damanhour University", "Damietta University", "Delta University for Science and Technology", "Egypt-Japan University of Science and Technology", "Egyptian Russian University", "Fayoum University", "Future University in Egypt", "Galala University", "German University in Cairo", "Helwan University", "Horus University - Egypt", "Kafrelsheikh University", "MSA University", "Mansoura University", "Menoufia University", "Minia University", "Misr International University", "Misr University for Science and Technology", "Nahda University in Beni Suef", "New Valley University", "Nile University", "Port Said University", "Sohag University", "South Valley University", "Suez Canal University", "Suez University", "Tabbin Institute for Metallurgical Studies", "Tanta University", "The American University in Cairo", "The British University in Egypt", "University of Sadat City", "Zagazig University" ] },
        { country: "Iraq", code: "iq", universities: [ "Al-Ayen Iraqi University, AUIQ", "Al-Furat Al-Awsat Technical University", "Al-Hadi University College", "Al-Muthanna University", "Al-Nahrain University", "Dijlah University College", "Erbil Polytechnic University", "Middle Technical University", "Salahaddin University-Erbil", "Soran University", "Southern Technical University, Iraq", "Sulaimani Polytechnic University", "The Islamic University, Najaf", "Tikrit University", "University Of Diyala", "University of Al-Ameed", "University of Al-Qadisiyah", "University of Anbar", "University of Babylon", "University of Baghdad", "University of Basrah", "University of Garmian", "University of Human Development", "University of Information Technology and Communications", "University of Kufa", "University of Kurdistan Hewlêr", "University of Misan", "University of Sulaimani", "University of Technology- Iraq", "Wasit University" ] },
        { country: "Jordan", code: "jo", universities: [ "Al-Balqa Applied University", "Al-Hussein Bin Talal University", "Amman Arab University", "Applied Science Private University", "German Jordanian University", "Hashemite University", "Isra University", "Jordan University of Science and Technology", "Philadelphia University", "The University of Jordan", "Yarmouk University" ] }, 
        { country: "Kuwait", code: "kw", universities: [ "Australian University","Kuwait College of Science & Technology" ] }, 
        { country: "Lebanon", code: "lb", universities: [ "American University of Beirut", "Beirut Arab University", "Holy Spirit University of Kaslik (USEK)", "Lebanese American University", "The International University of Beirut", "Université Libanaise", "Université Saint-Joseph de Beyrouth" ] }, 
        { country: "Libya", code: "ly", universities: [ "Omar Al-Mukhtar University" ] }, 
        { country: "Morocco", code: "ma", universities: [ "Ecole Nationale d'Agriculture", "Hassan II University of Casablanca", "International University of Rabat", "Mohammed V University in Rabat", "Mohammed VI Polytechnic University", "Université Cadi Ayyad", "Université Chouaib Doukkali", "Université Ibn Tofail", "Université Ibn Zohr", "Université Mohammed Premier Oujda", "Université Moulay Ismaïl", "Université Sidi Mohamed Ben Abdellah" ] }, 
        { country: "Oman", code: "om", universities: [ "A’Sharqiyah University", "Dhofar University", "Sohar University", "Sultan Qaboos University", "University of Nizwa" ] }, 
        { country: "Palestine", code: "ps", universities: [ "An-Najah National University","Birzeit University" ] }, 
        { country: "Qatar", code: "qa", universities: [ "Qatar University" ] },
        { country: "Saudi Arabia", code: "sa", universities: [ "Al Yamamah University", "Al-Imam Muhammad Ibn Saud Islamic University", "Alfaisal University", "Cairo University", "Effat University, Saudi Arabia", "Fahad Bin Sultan University", "Imam Abdulrahman Bin Faisal University", "Jazan University", "Jouf University", "King Abdulaziz University", "King Abdullah Petroleum Studies and Research Center", "King Abdullah University of Science and Technology", "King Fahd University of Petroleum and Minerals", "King Faisal University", "King Khalid University", "King Saud University", "King Saud bin Abdulaziz University for Health Sciences", "Majmaah University", "Najran University", "Prince Mohammad Bin Fahd University", "Prince Sattam Bin Abdulaziz University", "Prince Sultan University", "Princess Nourah Bint Abdulrahman University", "Qassim University", "Shaqra University", "Taibah University", "Taif University", "Umm Al-Qura University", "University of Bisha", "University of Ha'il", "University of Hafr Al-Batin", "University of Jeddah", "University of Tabuk" ] },
        { country: "Sudan", code: "sd", universities: [ "Alzaiem Alazhari University","Khartoum University" ] }, 
        { country: "Syria", code: "sy", universities: [ "Damascus University" ] }, 
        { country: "Tunisia", code: "tn", universities: [ "University of Carthage", "University of Sfax", "Université de Gabès", "Université de Jendouba", "Université de Monastir", "Université de Sousse", "Université de Tunis El Manar", "Université de la Manouba" ] },
        { country: "United Arab Emirates", code: "ae", universities: [ "Abu Dhabi University", "Ajman University", "Al Ain University", "American University of Sharjah", "British University in Dubai", "European University College, Dubai", "Higher Colleges of Technology", "Khalifa University of Science and Technology", "Mohamed Bin Zayed University of Artificial Intelligence", "S P Jain School of Global Management", "Skyline University College", "United Arab Emirates University", "University of Sharjah", "Zayed University" ] },
        { country: "Yemen", code: "ye", universities: [ "Hodeida University" ] }
    ]

    /* this.countries = [
      { name: 'Algeria', code: 'DZ' },
      { name: 'Egypt', code: 'EG' },
      { name: 'Iraq', code: 'IQ' },
      { name: 'Jordan', code: 'JO' },
      { name: 'Kuwait', code: 'KW' },
      { name: 'Lebanon', code: 'LB' },
      { name: 'Libya', code: 'LY' },
      { name: 'Mauritania', code: 'MR' },
      { name: 'Morocco', code: 'MA' },
      { name: 'Oman', code: 'OM' },
      { name: 'Palestine', code: 'PS' },
      { name: 'Qatar', code: 'QA' },
      { name: 'Saudi Arabia', code: 'SA' },
      { name: 'Sudan', code: 'SS' },
      { name: 'Somalia', code: 'SO' },
      { name: 'Syria', code: 'SY' },
      { name: 'Tunisia', code: 'TN' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'Yemen', code: 'YE' }
    ]; */
  }

  /* getRankings(year: number): any{
    this.rankingService.getRankingLarge(year);
    this.loading = false;
  }*/

  clear(table: Table) {
    table.clear();
    this.isfilterArabResearch=false;
    table.value = this.testAux;
    table.filter('', 'working', 'equals');
    table.filter('', 'university', 'equals');
    table.filter('', 'category', 'equals');
    table.filter('', 'subcategory', 'equals');

    this.selectedCountryUniversity = undefined;
    this.selectedInstitucion = "";

    this.selectedLastCountry = undefined;
    this.selectedCountry = undefined;
    this.selectedCategory = undefined;
    this.selectedSubcategory = '';
    this.clearField2 = '';
  }

  filterArabResearch(){
    if(this.isfilterArabResearch)
    {
      this.test = this.testAux;
    }
    else{
      this.test = this.test.filter(item => this.arabCountries.includes(item.country!))
      .map((item, index) => ({...item,
        position: (index + 1)
      }));
    }
    this.isfilterArabResearch = !this.isfilterArabResearch;
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
