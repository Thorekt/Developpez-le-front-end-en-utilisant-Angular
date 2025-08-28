import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.countryId = this.route.snapshot.params['id'];
    if( this.countryId == null){
      this.router.navigate(['/404']);
      return;
    }

    this.olympicCountry$ = this.olympicService.getOlympicById(this.countryId);

    this.olympicCountry$.subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/404']);
        }
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

}
