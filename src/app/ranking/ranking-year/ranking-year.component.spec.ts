import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingYearComponent } from './ranking-year.component';

describe('RankingYearComponent', () => {
  let component: RankingYearComponent;
  let fixture: ComponentFixture<RankingYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
