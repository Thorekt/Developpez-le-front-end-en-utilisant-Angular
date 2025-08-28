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
  countriesCount: number = 0;
  josCount: number = 0;

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

  /**
   * Display the Olympic pie chart and set the statistics.
   * @param data 
   */
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

    this.josCount = this.getAllParticipationYears(data).length;
    this.countriesCount = data.length;
    this.chartData = formattedData;    
  }

  /**
   * Format the Olympic data for the pie chart.
   * @param olympicData 
   * @returns 
   */
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

  /**
   * Get all unique participation years from the Olympic data.
   * 
   * @param olympicData 
   * @returns 
   */
  private getAllParticipationYears(olympicData: Olympic[] | null): number[] {
    if (!olympicData) {
      return [];
    }

    let years: number[] = [];

    console.log(olympicData);

    olympicData.forEach(olympic => {
      olympic.getAllParticipationYears().forEach(year => {
        if (!years.includes(year)) {
          years.push(year);
        }
      });
    });
    return years;
  }

}
