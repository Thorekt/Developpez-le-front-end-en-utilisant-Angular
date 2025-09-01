import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import Olympic from 'src/app/core/models/classes/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import CountriesCharPieData from 'src/app/core/models/classes/CountriesCharPieData';
import { DataDisplayerComponent } from 'src/app/components/data-displayer/data-displayer.component';
import DataDisplayerData from 'src/app/core/models/classes/DataDisplayerData';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]|null> = of([]);
  private olympicsSubcription: Subscription = new Subscription();

  chartData: CountriesCharPieData | null = null;
  dataDisplayerData: DataDisplayerData | null = null;
  countriesCount: number = 0;
  josCount: number = 0;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();

    this.olympicsSubcription = this.olympics$.subscribe({
      next: (data) => {
        this.displayOlympicPieChart(data);
      },
      error: () => {
        this.displayOlympicPieChart(null);
      }
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.olympicsSubcription.unsubscribe();
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

    this.dataDisplayerData = new DataDisplayerData('Medals per Country',
      [
        {
          name: 'Number of JOs',
          value: this.getAllParticipationYears(data).length.toString()
        },
        {
          name: 'Number of countries',
          value: data.length.toString()
        }
      ]
    )

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

    const data = olympicData.map((olympic, index) => ({
      id: olympic.id,
      label: olympic.country,
      value: olympic.getTotalMedals()
    }));

    return new CountriesCharPieData(data);
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
