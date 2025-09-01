import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import CountryLineChartData from 'src/app/core/models/classes/CountryLineChartData';
import DataDisplayerData from 'src/app/core/models/classes/DataDisplayerData';
import Olympic from 'src/app/core/models/classes/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
    selector: 'app-olympic-country-detail',
    templateUrl: './olympic-country-detail.component.html',
    styleUrl: './olympic-country-detail.component.scss',
    standalone: false
})

export class OlympicCountryDetailComponent implements OnInit {
  public olympicCountry$: Observable<Olympic|null> = of(null);
  countryId: number | null = null;
  dataDisplayerData: DataDisplayerData | null = null;
  chartData: CountryLineChartData | null = null;

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.countryId = Number(this.route.snapshot.params['id']);

    if(!Number.isInteger(this.countryId) || this.countryId < 0) {
      this.router.navigate(['/404']);
      return;
    }

    this.olympicCountry$ = this.olympicService.getOlympicById(this.countryId);

    this.olympicCountry$.subscribe({
      next: (data) => {
        if (!data) {
          console.error('No Olympic data found for country ID:', this.countryId);
          this.router.navigate(['/404']);
          return;
        }
        this.displayOlympicLineChart(data);
      },
      error: (e) => {
        console.error('Error fetching Olympic data', e);
        this.router.navigate(['/404']);
      },
    });
  }

  private displayOlympicLineChart(data: Olympic): void {
    console.log(data);
    const formattedData = this.getFormatedOlympicData(data);
    if (!formattedData) {
      this.router.navigate(['/404']);
      return;
    }

    this.chartData = formattedData;

    this.dataDisplayerData = new DataDisplayerData(data.country,
      [
        {
          name: 'Number of entries',
          value: data.getTotalParticipations().toString()
        },
        {
          name: 'Total number medals',
          value: data.getTotalMedals().toString()
        },
        {
          name: 'Total number of athletes',
          value: data.getTotalAthletes().toString()
        }
      ]
    );
  }

  private getFormatedOlympicData(olympicData: Olympic | null): CountryLineChartData | null {
    if (!olympicData) {
      return null;
    }

    const labels: number[] = [];
    const data: number[] = [];

    for (const participation of olympicData.participations) {
      labels.push(participation.year);
      data.push(participation.medalsCount);
    }

    return new CountryLineChartData(labels, data);
  }

}
