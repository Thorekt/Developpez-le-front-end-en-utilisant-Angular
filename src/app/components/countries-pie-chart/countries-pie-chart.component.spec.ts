import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesPieChartComponent } from './countries-pie-chart.component';

describe('CountriesPieChartComponent', () => {
  let component: CountriesPieChartComponent;
  let fixture: ComponentFixture<CountriesPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
