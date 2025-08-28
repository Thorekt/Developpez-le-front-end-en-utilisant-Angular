import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import Olympic from '../models/classes/Olympic';
import IOlympic from '../models/interfaces/IOlympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]|null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<IOlympic[]|null> {
    return this.http.get<IOlympic[]|null>(this.olympicUrl).pipe(
      map((dtos) => (dtos ?? []).map((dto) => Olympic.fromServiceData(dto))),
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

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: string): Observable<Olympic|null> {
    return this.olympics$.asObservable().pipe(
      map((olympics: Olympic[] | null) => olympics?.find((olympic: Olympic) => olympic.id === Number(id)) || null)
    );
  }
}
