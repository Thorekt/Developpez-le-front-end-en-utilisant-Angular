import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
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

  ngAfterViewInit() {
    const ctx = this.chartPieCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;
    if (!this.chartData) return;

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
