import { Component, OnInit, TemplateRef } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { EventBooking } from 'src/app/model/reservation';
import { PackageService } from 'src/app/service/package.service';
import { ReserveService } from 'src/app/service/reserve.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { packages, Package } from '../../model/packages';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UuidService } from 'src/app/service/uuid.service';

const SUCCESS_MSG = 'Reservation Successful!!';
const FAIL_MSG = 'Please Try Again !!!!!';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  //packages: Array<Package> = new Array<Package>();
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
  packageTypes: Package[] = [];

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
    private router: Router,
    private spinner: NgxSpinnerService,
    private uuidService: UuidService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.token.getToken() ? true : false;

    this.packageService.getAllPackages().subscribe((res) => {
      this.packageTypes = res;
    });
  }

  onSubmit(template: TemplateRef<any>): void {
    this.spinner.show();
    // alert(this.form.name);
    console.log(this.form);
    this.isValidationFail = false;

    console.log(this.form);
    this.reservation = {
      id: this.uuidService.generateUUID(),
      name: this.form.name,
      email: this.form.email,
      contactNumber: this.form.contactNo,
      message: this.form.message,
      location: this.form.location,
      userId: this.isLoggedIn
        ? this.token.getUserId()
        : this.uuidService.generateUUID(),
      bookDate: new Date(this.form.date),
      packageId: this.form.package,
      packageName: this.findPackageName(this.form.packageId),
    };
    console.log(this.reservation);
    this.validation();
    if (!this.isValidationFail) {
      this.reserveService.addReservation(this.reservation).subscribe(
        (res) => {
          console.log(res);
          this.clear();
          this.isSuccessful = true;
          this.messageModal = SUCCESS_MSG;
          this.router.navigateByUrl('');
        },
        (err) => {
          console.log('==>' + err.error);
          this.isError = true;
          this.messageModal = FAIL_MSG;
        }
      );
    }

    this.openModal(template);

    this.spinner.hide();
  }

  openModal(template: TemplateRef<any>) {
    // console.log(this.isSuccessful);
    // console.log(this.isError);
    if (this.isSuccessful != this.isError || this.isValidationFail)
      this.modalRef = this.modalService.show(template);
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

    console.log(typeof this.form.date);
    let currentDate = new Date();
    console.log('==<<<<<' + currentDate.getFullYear());

    // parseInt(this.form.date.substring(8)) <= currentDate.getDate()

    let today: Date = new Date();
    let slectedDate: Date = new Date(this.form.date);
    if (slectedDate.getTime() < today.getTime()) {
      this.messageModal = 'Select a valid date\n';
      this.isValidationFail = true;
    }
  }

  findPackageName(id: string | undefined) {
    let pack = this.packageTypes.find((p) => (p.id = this.form.package));
    return pack?.name;
  }
}
