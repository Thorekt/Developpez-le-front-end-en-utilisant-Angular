import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-countries-pie-chart',
  templateUrl: './countries-pie-chart.component.html',
  styleUrls: ['./countries-pie-chart.component.scss'] 
})
export class CountriesPieChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartPieCanvas', { static: false }) chartPieCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit() {
    const ctx = this.chartPieCanvas?.nativeElement?.getContext('2d');
    if (!ctx) return;


    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['FR', 'US', 'JP'],
        datasets: [{ data: [40, 35, 25] }]
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
