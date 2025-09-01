import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import CountriesCharPieData from 'src/app/core/models/classes/CountriesCharPieData';

/**
 * Plugin pour afficher les étiquettes externes sur le graphique en secteurs
 */
const externalLabelsPlugin = {
  id: 'externalLabels',
  afterDatasetsDraw(chart: Chart) {
    const {ctx, chartArea} = chart;
    const ds = chart.getDatasetMeta(0);
    if (!ds || !ds.data) return;

    ctx.save();
    ctx.font = `${getFontSize(chart.width)}px Segoe UI`;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#273238';
    ctx.lineWidth = 2;

    ds.data.forEach((arc: any, i: number) => {
      // Données & géométrie de l’arc
      const label = String(chart.data.labels?.[i] ?? '');
      const {x, y, startAngle, endAngle, outerRadius} = arc.getProps(['x','y','startAngle','endAngle','outerRadius'], true);

      // Angle médian
      const angle = (startAngle + endAngle) / 2;

      // Point de départ du trait (juste au bord du donut)
      const p1x = x + Math.cos(angle) * (outerRadius );
      const p1y = y + Math.sin(angle) * (outerRadius -10);

      // Extrémité du trait horizontal
      const rightSide = Math.cos(angle) >= 0;
      const hLen = getHLen(chart.width);
      const p2x = p1x + (rightSide ? hLen : -hLen);
      const p2y = p1y;

      // Trait de liaison
      ctx.beginPath();
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);      
      ctx.strokeStyle = (chart.data.datasets?.[0].backgroundColor as string[] | undefined)?.[i] || '#ffffff';
      ctx.stroke();

      // Libellé (aligné à gauche/droite)
      ctx.textAlign = rightSide ? 'left' : 'right';
      const textX = p2x + (rightSide ? 6 : -6);
      const textY = p2y;
      ctx.fillText(label, textX, textY);
    });

    ctx.restore();
  }
};

Chart.register(externalLabelsPlugin);

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
          data: this.chartData.data.map(item => item.value),
          backgroundColor: ['#793d52','#956065','#89a2db','#9780a1','#bfe0f1','#b8cbe7'],
          hoverBackgroundColor: ['#793d52','#956065','#89a2db','#9780a1','#bfe0f1','#b8cbe7'],          
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
        maintainAspectRatio: false,
        elements:{
          arc: { 
            borderWidth: 0,
            offset: 0
          }
        },
        plugins: {
          legend: { display: false },
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
              label: (ctx) => `🏅${ctx.parsed}`
              
            }
          }
        }
      }
    });
  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   * destroys the chart instance.
   */
  ngOnDestroy() {
    this.chart?.destroy();
  }
}


// Thresholds for responsive design
const tresholds = [
  { width: 1000, fontSize: 28 },
    { width: 600, fontSize: 24 },
    { width: 500, fontSize: 20 },
    { width: 400, fontSize: 16 },
    { width: 300, fontSize: 12 },
    { width: 200, fontSize: 8 }
  ];

/**
 * Get the horizontal length for the labels lines based on the canvas width.
 * @param canvasWidth The width of the canvas.
 * @returns The horizontal length for the labels lines.
 */
function getHLen(canvasWidth: number): number {
  return canvasWidth / 10;
}

/**
 * Get the font size for the labels based on the canvas width.
 * @param canvasWidth The width of the canvas.
 * @returns The font size for the labels.
 */
function getFontSize(canvasWidth: number): number {
  for (const t of tresholds) {
    if (canvasWidth >= t.width) return t.fontSize;
  }
  return 24;
}