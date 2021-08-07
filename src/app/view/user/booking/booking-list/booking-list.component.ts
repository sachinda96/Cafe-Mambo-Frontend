import { Component, OnInit } from '@angular/core';
import { ReserveService } from 'src/app/service/reserve.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  constructor(private resService: ReserveService) {}

  ngOnInit(): void {}
}
