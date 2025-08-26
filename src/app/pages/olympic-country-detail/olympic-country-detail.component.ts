import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-olympic-country-detail',
  templateUrl: './olympic-country-detail.component.html',
  styleUrl: './olympic-country-detail.component.scss'
})
export class OlympicCountryDetailComponent implements OnInit {
  countryId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const countryId = this.route.snapshot.params['id'];
    this.countryId = countryId;
  }

}
