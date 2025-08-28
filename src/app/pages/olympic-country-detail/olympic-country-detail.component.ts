import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import Olympic from 'src/app/core/models/classes/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
    selector: 'app-olympic-country-detail',
    templateUrl: './olympic-country-detail.component.html',
    styleUrl: './olympic-country-detail.component.scss',
    standalone: false
})
export class OlympicCountryDetailComponent implements OnInit {
  public olympicCountry$: Observable<Olympic|null> = of(null);
  countryId: string | null = null;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService) { }

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countryId = countryId;
    this.olympicCountry$ = this.olympicService.getOlympicById(countryId);
  }

}
