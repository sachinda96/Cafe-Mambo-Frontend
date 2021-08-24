import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { EventBooking, EventBookingUser } from 'src/app/model/reservation';
import { PackageService } from 'src/app/service/package.service';
import { ReserveService } from 'src/app/service/reserve.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { packages, Package } from '../../model/packages';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  packages: Array<Package> = new Array<Package>();
  reservation: EventBooking = new EventBooking();
  reservationUser: EventBooking = new EventBooking();
  payment: Payment = new Payment();
  isLoggedIn = false;
  //packages
  //  types = ['Golden', 'Silver', 'Bronze'];
  types: Package[] = [];

  form: any = {
    name: null,
    email: null,
    contactNo: null,
    location: null,
    message: '',
    package: null,
    date: Date,
  };

  isSuccessful = false;
  errorMessage = '';
  constructor(
    public token: TokenStorageService,
    private reserveService: ReserveService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.token.getToken() ? true : false;

    this.packageService.getAllPackages().subscribe((res) => {
      this.types = res;
    });
  }

  onSubmit(): void {
    // alert(this.form.name);
    console.log(this.form);

    if (!this.isLoggedIn) {
      console.log(this.form);
      this.reservation = {
        id: '',
        name: this.form.name,
        email: this.form.email,
        contactNumber: this.form.contactNo,
        location: this.form.location,
        message: this.form.message,
        bookDate: this.form.date,
        packageId: this.form.package,
        userId: '',
      };
      this.reserveService.addReservation(this.reservation).subscribe(
        (res) => {
          console.log(res);
          this.form = {
            name: null,
            email: null,
            contactNo: null,
            location: null,
            message: '',
            package: null,
            date: Date,
          };
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.reservationUser = {
        id: '',
        userId: this.token.getUserId(),
        contactNumber: this.form.contactNo,
        location: this.form.location,
        message: this.form.message,
        bookDate: this.form.date,
        packageId: this.form.package,
        name: '',
        email: '',
      };

      this.reserveService.addReservation(this.reservationUser).subscribe(
        (data) => {
          this.form = {
            name: null,
            email: null,
            contactNo: null,
            location: null,
            message: '',
            package: null,
            date: Date,
          };
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
