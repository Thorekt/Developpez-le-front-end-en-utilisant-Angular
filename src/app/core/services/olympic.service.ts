import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map, filter, take } from 'rxjs/operators';
import Olympic from '../models/classes/Olympic';
import IOlympic from '../models/interfaces/IOlympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]|null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Loads initial data from the API.
   * @returns An observable of the loaded Olympic data or null.
   */
  loadInitialData(): Observable<IOlympic[]|null> {
    return this.http.get<IOlympic[]|null>(this.olympicUrl).pipe(
      map((dtos) => (dtos ?? []).map((dto) => Olympic.fromServiceData(dto))),
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  /**
   * Waits until the Olympic data is loaded.
   * @returns An observable of the loaded Olympic data.
   */
  waitUntilLoaded(): Observable<Olympic[]> {
    return this.olympics$.pipe(
      filter((v): v is Olympic[] => v !== null),
      take(1)
    );
  }

  /**
   * Gets the current Olympic data.
   * @returns An observable of the current Olympic data or null.
   */
  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  /**
   * Gets an Olympic event by its ID.
   * @param id The ID of the Olympic event.
   * @returns An observable of the Olympic event or null.
   */
  getOlympicById(id: Olympic['id']): Observable<Olympic | null> {
    return this.waitUntilLoaded().pipe(
      map((olympics: ReadonlyArray<Olympic> | null) =>
        olympics?.find((olympic: Olympic) => olympic.id === id) ?? null
      )
    );
  }

}
