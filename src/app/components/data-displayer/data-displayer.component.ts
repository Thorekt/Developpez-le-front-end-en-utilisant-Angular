import { Component, Input } from '@angular/core';
import DataDisplayerData from 'src/app/core/models/classes/DataDisplayerData';

@Component({
  selector: 'app-data-displayer',
  imports: [],
  templateUrl: './data-displayer.component.html',
  styleUrl: './data-displayer.component.scss'
})
export class DataDisplayerComponent {
  @Input() DataDisplayerData!: DataDisplayerData;

  constructor() {
  }
}
