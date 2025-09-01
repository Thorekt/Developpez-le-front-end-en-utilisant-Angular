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
        labels:  this.chartData.labels,
        datasets: [
          {
            label: 'Participation',
            data: this.chartData.data,
            borderColor: '#793d52',
            spanGaps: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: false 
          },
          tooltip: {
            displayColors: false,
            xAlign: 'center',
            yAlign: 'bottom',
            backgroundColor: '#106d72',
            bodyAlign: 'center',
            titleAlign: 'center',
            titleFont: { size: 16, weight: 'normal', family: 'Segoe UI' },
            bodyFont: { size: 16, weight: 'normal', family: 'Segoe UI' },
            padding: 10,
            callbacks: {
              label: (ctx) => `🏅${ctx.parsed.y}`
              
            }
          }
        },
        elements: {
          point: {
            radius: 0,
          }
        },
        
        scales: {
          x: { 
            title: { 
              display: true, 
              text: 'Dates',
              color: '#9e9e9e',
              font: { size: 20, weight: 500, family: 'Segoe UI' }
            },
            border:{
              display: false
            },
            beginAtZero: false,
            grace: '20%',
          },
          y: {
            beginAtZero: false,
            border: {
              display: false
            },
            grace: '20%'
          },
        },
      },
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * destroys the chart instance.
   */
  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
