import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { OrderDTO } from 'src/app/model/order';
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
  orderList: Array<OrderDTO> = new Array<OrderDTO>();
  itemList: Array<Item> = new Array<Item>();
  userId: string | null = '';

  constructor(
    private tokenService: TokenStorageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getUserId() != null)
      this.userId = this.tokenService.getUserId();

    this.orderService.getAllOrdersByUser(this.userId).subscribe(
      (data) => {
        this.orderList = data;
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
