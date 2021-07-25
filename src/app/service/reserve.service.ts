import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/reservation';
import { BASE_URL } from 'src/environments/environment';
import { Package } from '../model/packages';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ReserveService {
  constructor(private http: HttpClient) {}

  /*for reservation */
  reserve(reserve: Reservation): Observable<any> {
    return this.http.post(BASE_URL + '/reserve', reserve, httpOptions);
  }

  getFreeDates() {
    return this.http.get<{ availableDates: string[] }>(
      BASE_URL + '/events/reservation/dates/available'
    );
  }

  getPackages() {
    return this.http.get<Package>(BASE_URL + '/events/reservation/packages');
  }

  getPackageTypes() {
    return this.http.get<{ types: string[] }>(
      BASE_URL + '/events/reservation/types'
    );
  }

  /*  for other users */
  getBookings() {
    return this.http.get(BASE_URL + '/bookings');
  }

  getBookingByID() {
    return this.http.get(BASE_URL + '/bookings/');
  }
}
