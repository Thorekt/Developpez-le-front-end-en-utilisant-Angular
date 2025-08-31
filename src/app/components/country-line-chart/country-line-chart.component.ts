import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import CountryLineChartData from 'src/app/core/models/classes/CountryLineChartData';

@Component({
    selector: 'app-country-line-chart',
    imports: [],
    templateUrl: './country-line-chart.component.html',
    styleUrl: './country-line-chart.component.scss'
})
export class CountryLineChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartLineCanvas', { static: false }) chartLineCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  @Input() chartData!: CountryLineChartData;

  constructor() {}


  ngAfterViewInit(): void {
    const ctx = this.chartLineCanvas.nativeElement.getContext('2d')!;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'Participation',
            data: this.chartData.data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: {
          x: { title: { display: true, text: 'Dates' } },
          y: { beginAtZero: false },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
