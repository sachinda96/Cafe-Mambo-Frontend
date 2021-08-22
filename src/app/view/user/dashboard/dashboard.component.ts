import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderDTO } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { DASHBOARD } from 'src/environments/environment';

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

  order: OrderDTO = new OrderDTO();

  constructor(
    private tokenService: TokenStorageService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenService.setContent(DASHBOARD);

    this.uid = this.tokenService.getUserId();
    if (this.uid != null) this.isLoggedIn = true;
  }

  getPendingOrders() {
    if (this.uid != null)
      this.orderService.getPendingOrdersByUser(this.uid).subscribe(
        (data) => {
          if (data) this.order = data;
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getView(loc: string) {
    this.router.navigate(['../', loc], { relativeTo: this.route });
  }
}
