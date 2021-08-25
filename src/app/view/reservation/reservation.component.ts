import { Component, OnInit, TemplateRef } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { EventBooking, EventBookingUser } from 'src/app/model/reservation';
import { PackageService } from 'src/app/service/package.service';
import { ReserveService } from 'src/app/service/reserve.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { packages, Package } from '../../model/packages';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

const SUCCESS_MSG = 'Reservation Successful!!';
const FAIL_MSG = 'Please Try Again !!!!!';

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
  isSuccessful = false;
  isError = false;
  modalRef: BsModalRef = new BsModalRef();
  valueWidth = false;
  messageModal = '';
  isValidationFail = false;
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

  errorMessage = '';
  constructor(
    public token: TokenStorageService,
    private reserveService: ReserveService,
    private packageService: PackageService,
    private modalService: BsModalService,
    private router: Router
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
      this.validation();
      if (!this.isValidationFail)
        this.reserveService.addReservation(this.reservation).subscribe(
          (res) => {
            console.log(res);
            this.clear();
            this.isSuccessful = true;
            this.messageModal = SUCCESS_MSG;
          },
          (err) => {
            console.log('==>' + err);
            this.isError = true;
            this.messageModal = FAIL_MSG;
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
      this.validation();
      if (!this.isValidationFail)
        this.reserveService.addReservation(this.reservationUser).subscribe(
          (data) => {
            this.clear();
            this.isSuccessful = true;
            this.messageModal = SUCCESS_MSG;
            this.clear();
          },
          (err) => {
            console.log('==>' + err);
            this.isError = true;
            this.messageModal = FAIL_MSG;
          }
        );
    }
  }

  openModal(template: TemplateRef<any>) {
    this.onSubmit();
    console.log(this.isSuccessful);
    console.log(this.isError);
    if (this.isSuccessful != this.isError || this.isValidationFail)
      this.modalRef = this.modalService.show(template);

    if (this.isSuccessful) this.router.navigate(['']);
  }

  clear() {
    this.form = {
      name: null,
      email: null,
      contactNo: null,
      location: null,
      message: '',
      package: null,
      date: Date,
    };
  }
  validation() {
    if (this.form.package == null || this.form.package == '') {
      this.messageModal = 'Select a valid Package \n';
      this.isValidationFail = true;
    }

    if (this.form.contactNo == null) {
      this.messageModal += 'Enter a Contact No \n';
      this.isValidationFail = true;
    }

    console.log(this.form.date);
    let currentDate = new Date();
    console.log('==<<<<<' + currentDate.getFullYear());
    if (
      parseInt(this.form.date.substring(8)) > currentDate.getDate() ||
      parseInt(this.form.date.substring(5, 7)) >= currentDate.getMonth() ||
      parseInt(this.form.date.substring(0, 4)) >= currentDate.getFullYear()
    ) {
      this.messageModal = 'Select a valid date\n';
      this.isValidationFail = true;
    }
  }
}
