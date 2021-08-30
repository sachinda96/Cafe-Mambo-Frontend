import {
  OnInit,
  Component,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemService } from 'src/app/service/item.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Item } from 'src/app/model/item';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {
  BASE_URL,
  CANCEL_URL,
  MERCHANT_ID,
  NOTIFY_URL,
  RETURN_URL,
  SHOP_ORDER_RETURN_URL,
} from '../../../environments/environment';
import { ShopOrder } from '../../model/shop-order';
import { Payment } from '../../model/payment';
import { OrderService } from '../../service/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class ItemRating {
  item: Item = new Item();
  index: number = 0;
  constructor() {}
}

declare var payhere: any;

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.css'],
})
export class ShopOrderComponent implements OnInit {
  itemList: Array<Item> = new Array<Item>();
  tempItemList: Array<Item> = new Array<Item>();
  categoryList: Array<Category> = new Array<Category>();
  max = 10;
  rate = 7;
  isReadonly = true;
  k = 0;
  modalRef: BsModalRef = new BsModalRef();
  categoryId: any;
  subtotal: number = 0;
  isCardPay: boolean = false;
  tableid: number = 0;
  shopOrder: ShopOrder = new ShopOrder();
  payment: Payment = new Payment();
  message: any = 'Processing';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private routerActive: ActivatedRoute,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.tableid = params.id;
        this.shopOrder.tableId = this.tableid;
      }
    });

    this.getAllCategory();
    payhere.onCompleted = function onCompleted(orderId: any) {
      this.payment = new Payment();
      this.payment.amount = this.subtotal;
      this.payment.paymentStatus = 'Success';
      this.payment.method = 'Card';
      this.shopOrder.paymentDto = this.payment;
      this.submitOrder();

      var url = BASE_URL + '/shoporder/placeorder';

      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.status);
          console.log(xhr.responseText);
          sessionStorage.removeItem('ORDER');

          alert('Order is Successful');
        }

        window.location.reload();
      };

      var data = sessionStorage.getItem('ORDER');

      xhr.send(data);
    };

    payhere.onDismissed = function onDismissed() {
      // this.payment = new Payment();
      // this.payment.amount = this.subtotal;
      // this.payment.paymentStatus = 'Success';
      // this.payment.method = 'Failed';
      // this.shopOrder.paymentDto = this.payment;
      // this.submitOrder();
      alert('Payment is Dismissed');
      sessionStorage.removeItem('ORDER');
    };

    payhere.onError = function onError(error: any) {
      sessionStorage.removeItem('ORDER');
      alert('Try Again');
    };
  }

  getAllCategory() {
    this.categoryList = new Array<Category>();
    this.categoryService.getAllMainCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setCategory(event: any) {
    this.categoryId = event.target.value;
    this.getAllItemByCategory(this.categoryId);
  }

  getAllItemByCategory(id: string) {
    this.itemService.getAllItemsByCategory(id).subscribe((res) => {
      this.itemList = res;
    });
  }

  addNew(item: Item) {
    item.qty = 1;
    item.total = item.price;
    this.subtotal = this.subtotal + item.price;
    this.tempItemList.push(item);
  }

  plusQty(item: Item) {
    this.subtotal = this.subtotal + item.price;
    item.qty = item.qty + 1;
    item.total = item.total * item.qty;
  }

  minQty(item: Item) {
    this.subtotal = this.subtotal - item.price;
    item.qty = item.qty - 1;
    item.total = item.price;
    item.total = item.total * item.qty;
  }

  removeSelectedItem(item: Item) {
    this.tempItemList.splice(this.tempItemList.indexOf(item), 1);
  }

  isCard() {
    this.isCardPay = true;
  }

  isCash() {
    this.isCardPay = false;
  }

  placeOrder() {
    if (this.isCardPay) {
      this.shopOrder.itemDtoList = this.tempItemList;
      this.payment = new Payment();
      this.payment.amount = this.subtotal;
      this.payment.paymentStatus = 'Success';
      this.payment.method = 'Card';
      this.shopOrder.paymentDto = this.payment;

      window.sessionStorage.setItem('ORDER', JSON.stringify(this.shopOrder));
      var payment = {
        sandbox: true,
        merchant_id: MERCHANT_ID,
        return_url: SHOP_ORDER_RETURN_URL + this.tableid,
        cancel_url: SHOP_ORDER_RETURN_URL + this.tableid,
        notify_url: NOTIFY_URL,
        order_id: Math.random().toString(36).substr(2, 9),
        items: this.getItemsAsCommaSeperatedList(),
        currency: 'LKR',
        amount: this.subtotal,
        first_name: this.shopOrder.customerName,
        last_name: '',
        email: 'shop@cafemambo.com',
        phone: this.shopOrder.contactNumber,
        address: 'shop',
        city: 'shop',
        country: 'Sri Lanka',
        delivery_address: '',
        delivery_city: '',
        delivery_country: 'Sri Lanka',
        custom_1: '',
        custom_2: '',
      };

      payhere.startPayment(payment);
    } else {
      this.payment = new Payment();
      this.payment.amount = this.subtotal;
      this.payment.paymentStatus = 'Success';
      this.payment.method = 'Cash';
      this.shopOrder.paymentDto = this.payment;
      this.submitOrder();
    }
  }

  getItemsAsCommaSeperatedList() {
    let str = '';
    this.tempItemList.forEach((c) => {
      str += c.id + ' ' + c.qty + '*' + c.total + ', ';
    });
    return str;
  }

  submitOrder() {
    this.spinner.show();
    this.shopOrder.itemDtoList = this.tempItemList;
    this.orderService.addShopOrder(this.shopOrder).subscribe(
      (res) => {
        this.spinner.hide();
        this.route.navigate(['']);
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
}
