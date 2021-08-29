import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderCustomer, OrderDTO } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { DASHBOARD } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    '../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class DashboardComponent implements OnInit {
  isProcessingOrder = false;
  uid: string | null = '';
  isLoggedIn = false;
  //true-if it is ready, false for no orders

  orderList: OrderCustomer[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.tokenService.setContent(DASHBOARD);

    this.uid = this.tokenService.getUserId();
    if (this.uid != null) this.isLoggedIn = true;
    else this.router.navigateByUrl('');

    this.getAllOrders();
    this.setPendingOrders();
  }

  getAllOrders() {
    this.spinner.show();
    if (this.uid != null)
      this.orderService.getAllOrdersByUser(this.uid).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.isProcessingOrder = true;

            this.orderList = data;
            this.spinner.hide();
          }
          console.log(data);
        },
        (err) => {
          console.log(err);
          this.isProcessingOrder = false;
        }
      );
  }

  getView(loc: string) {
    this.router.navigate(['../', loc], { relativeTo: this.route });
  }

  setPendingOrders() {
    var orderPendingList: OrderCustomer[] = [];

    this.orderList.forEach((order) => {
      if (order.orderStatus.toLowerCase().localeCompare('pending') == 0) {
        orderPendingList.push(order);
      }
      this.orderList = orderPendingList;
    });
  }
}
