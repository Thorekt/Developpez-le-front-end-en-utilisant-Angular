import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IOlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<IOlympicCountry[]|null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<IOlympicCountry[]|null>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: string) {
    return this.olympics$.asObservable().pipe(
      map((olympics: IOlympicCountry[] | null) => olympics?.find((olympic: IOlympicCountry) => olympic.id === Number(id)) || null)
    );
  }
}
