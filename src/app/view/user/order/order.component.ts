import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Item } from 'src/app/model/item';
import { OrderCustomer } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: [
    './order.component.css',
    '../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class OrderComponent implements OnInit {
  orderList: Array<OrderCustomer> = new Array<OrderCustomer>();
  itemList: Array<Item> = new Array<Item>();
  userId: string | null = '';

  constructor(
    private tokenService: TokenStorageService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getUserId() != null)
      this.userId = this.tokenService.getUserId();

    this.spinner.show();
    this.orderService.getAllOrdersByUser(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.orderList = data;
        this.spinner.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

/*
token service 
Orderservice 
ItemService




 id: string = '';
  orderDate: Date = new Date();
  userId: string | null = '';
  paymentDto: Payment = new Payment();
  deliveryDto: Delivery = new Delivery();
  itemDtoList: Array<CheckoutItem> = new Array<CheckoutItem>();

*/
