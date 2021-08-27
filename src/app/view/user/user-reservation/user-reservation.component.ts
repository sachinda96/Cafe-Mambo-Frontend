import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  bookingList: Array<any> = new Array<any>();
  userId: string | null = '';
  packageList: Package[] = [];
  errorStatusMsg: string = '';
  errorStatus: number = 0;
  errorStat: any;
  constructor(
    private tokenService: TokenStorageService,
    private bookingService: ReserveService,
    private packageService: PackageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    if (this.userId == null) this.router.navigateByUrl('');
    this.packageService.getAllPackages().subscribe(
      (data) => {
        this.packageList = data;
      },
      (err) => {
        if (err.status == 400) {
          this.errorStatus = 400;
          this.errorStatusMsg = 'No Reservations Made';
        }
        console.log(err);
      }
    );
    this.bookingService.getAllReservationsByUser(this.userId).subscribe(
      (data) => {
        console.log("test")
        console.log(data);
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
