import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import Olympic from 'src/app/core/models/classes/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import CountriesCharPieData from 'src/app/core/models/classes/CountriesCharPieData';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]|null> = of([]);

  chartData: CountriesCharPieData | null = null;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe({
      next: (data) => {
        this.displayOlympicPieChart(data);
      },
      error: () => {
        this.displayOlympicPieChart(null);
      }
    });
  }

  private displayOlympicPieChart(data: Olympic[] | null): void {
    if(data == null){
      // Handle null data case
      return;
    }

    const formattedData = this.getFormatedOlympicData(data);
    if (!formattedData) {
      // Handle case where formatting fails
      return;
    }

    this.chartData = formattedData;
    
  }

  private getFormatedOlympicData(olympicData: Olympic[] | null): CountriesCharPieData | null {
    if (!olympicData) {
      return null;
    }

    const labels = olympicData.map(item => item.country);
    const dataset = olympicData.map(item => item.getTotalMedals());

    return {
      labels,
      datasets: [
        {
          data: dataset
        }
      ]
    };
  }
}
