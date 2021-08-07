import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventBookingDto, Reservation } from '../model/reservation';
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

  /*for event  reservation  // event booking*/

  getAllReservations() {
    return this.http.get<EventBookingDto[]>(BASE_URL + '/eventbooking/getAll');
  }

  getReservationById(id: string) {
    return this.http.get(BASE_URL + '/eventbooking/get/' + id, httpOptions);
  }

  addReservation(reserve: EventBookingDto): Observable<any> {
    return this.http.post(
      BASE_URL + '/eventbooking/save',
      reserve,
      httpOptions
    );
  }

  updateReservation(reserve: EventBookingDto) {
    return this.http.post(
      BASE_URL + '/eventbooking/update',
      reserve,
      httpOptions
    );
  }
  deleteReservation(id: string) {
    return this.http.get(BASE_URL + '/eventbooking/remove/' + id, httpOptions);
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
}
