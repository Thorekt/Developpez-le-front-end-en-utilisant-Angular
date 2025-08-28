import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import CountriesCharPieData from 'src/app/core/models/classes/CountriesCharPieData';

@Component({
  selector: 'app-countries-pie-chart',
  templateUrl: './countries-pie-chart.component.html',
  styleUrls: ['./countries-pie-chart.component.scss'] 
})
export class CountriesPieChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartPieCanvas', { static: false }) chartPieCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  @Input() chartData!: CountriesCharPieData;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const ctx = this.chartPieCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;
    if (!this.chartData) return;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.chartData.data.map(item => item.label),
        datasets: [{
          data: this.chartData.data.map(item => item.value)
        }]
      },
      options: {
         onClick: (_evt, elements) => {
          if (!elements.length) return;
          const index = elements[0].index;
          const country = this.chartData.data[index];
          this.router.navigate(['/olympic-country', country.id]);
        },
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
