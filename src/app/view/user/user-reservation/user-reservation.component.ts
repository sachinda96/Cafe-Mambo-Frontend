import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/model/packages';
import { EventBooking } from 'src/app/model/reservation';
import { PackageService } from 'src/app/service/package.service';
import { ReserveService } from 'src/app/service/reserve.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: [
    './user-reservation.component.css',
    '../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class UserReservationComponent implements OnInit {
  bookingList: Array<EventBooking> = new Array<EventBooking>();
  userId: string | null = '';
  packageList: Package[] = [];
  constructor(
    private tokenService: TokenStorageService,
    private bookingService: ReserveService,
    private packageService: PackageService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.packageService.getAllPackages().subscribe(
      (data) => {
        this.packageList = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.bookingService.getAllReservationsByUser(this.userId).subscribe(
      (data) => {
        this.bookingList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findPackage(id: string | undefined) {
    if (id != undefined) return this.packageList.find((p) => (p.id = id))?.name;
    else return '';
  }
}
