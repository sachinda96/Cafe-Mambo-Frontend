import { Component, OnInit } from '@angular/core';
import { EventBooking } from 'src/app/model/reservation';
import { ReserveService } from 'src/app/service/reserve.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css'],
})
export class BookingDetailComponent implements OnInit {
  reservationArray: EventBooking[] = [];

  constructor(private reservService: ReserveService) {
    // this.reservationArray = reservService.getAllReservations();
  }

  ngOnInit(): void {}
}
