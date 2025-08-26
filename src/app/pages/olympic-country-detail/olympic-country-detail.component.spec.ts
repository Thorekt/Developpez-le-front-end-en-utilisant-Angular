import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicCountryDetailComponent } from './olympic-country-detail.component';

describe('OlympicCountryDetailComponent', () => {
  let component: OlympicCountryDetailComponent;
  let fixture: ComponentFixture<OlympicCountryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OlympicCountryDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OlympicCountryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
