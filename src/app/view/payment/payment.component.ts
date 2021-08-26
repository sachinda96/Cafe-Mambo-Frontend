import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderDTO } from 'src/app/model/order';
import { Delivery } from 'src/app/model/delivery';
import { Payment } from 'src/app/model/payment';
import { TokenStorageService } from '../../service/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import {
  BASE_URL,
  CANCEL_URL,
  MERCHANT_ID,
  NOTIFY_URL,
  RETURN_URL,
} from 'src/environments/environment';
import { Item, ItemDTO } from 'src/app/model/item';
import { Router } from '@angular/router';

declare var payhere: any;

const SUCCESS_MSG = 'Order is  succesfully completed';
const FAIL_MSG = 'Order is not completed sucessfully';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  totalQuantity: number = 0;
  cartItemList: Array<CartItem> = new Array<CartItem>();
  delivery: Delivery = new Delivery();
  payment: Payment = new Payment();
  totalPrice = 0.0;
  order: OrderDTO = new OrderDTO();

  showDeliveryDetails = true;
  showSuccessModal = false;
  cardItemArray: string[] = [];
  userId: any = '';

  modalRef: BsModalRef = new BsModalRef();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private viewRef: ViewContainerRef,
    private modalService: BsModalService,
    private router: Router
  ) {
    payhere.onCompleted = function onCompleted(orderId: any) {
      console.log('Payment completed. OrderID:' + orderId);
      this.sendOrder();
    };

    payhere.onDismissed = function onDismissed() {
      console.log('Payment dismissed');
      this.spinner.hide();
    };

    payhere.onError = function onError(error: any) {
      console.log('Error:' + error);
      this.spinner.hide();
    };
  }

  ngOnInit(): void {
    this.cartItemList = this.cartService.getItems();
    this.cartItemList = this.cartService.getItems();
    this.totalQuantity = this.cartService.getItemsTotalCount();
    this.totalPrice = this.cartService.getItemsTotalPrice();
    this.userId = this.tokenStorageService.getUserId();
    if (this.userId == null) this.router.navigate(['']);
    if (this.totalQuantity == 0) this.router.navigate(['']);
  }

  form: any = {
    name: null,
    email: null,
    contactNo: null,
    address: null,
    city: null,
    district: null,
    message: '',
    type: '',
    date: null,
  };

  isOrderSuccessful = false;
  isOrderFail = false;
  isPaymentSuccessful = false;
  errorMessage = '';
  Message = '';

  onSubmit(): void {
    this.spinner.show();
    this.modalRef.hide();

    this.order.total = this.totalQuantity;
    this.order.orderDate = new Date();
    this.setCustomerDetails();
    this.setDeliveryDetails();
    this.setPaymentDetails();
    this.setItemDtoDetails();

    console.log(this.order);

    if (this.form.type != 'cod') {
      this.paynow();
    } else if (this.form.type != 'cash') {
      this.sendOrder();
    } else {
      this.spinner.hide();
    }
  }

  paynow() {
    // Put the payment variables here

    var payment = {
      sandbox: true,
      merchant_id: MERCHANT_ID, // Replace your Merchant ID
      return_url: RETURN_URL, // Important
      cancel_url: CANCEL_URL, // Important
      notify_url: NOTIFY_URL,
      order_id: 'ItemNo12345',
      items: this.getItemsAsCommaSeperatedList(),
      currency: 'LKR',
      amount: this.order.paymentDto.amount,
      first_name: this.form.name,
      last_name: '',
      email: 'samanp@gmail.com',
      phone: this.form.contactNo,
      address: this.form.address,
      city: this.form.city,
      country: 'Sri Lanka',
      delivery_address: this.form.address,
      delivery_city: this.form.city,
      delivery_country: 'Sri Lanka',
      custom_1: '',
      custom_2: '',
    };
    console.log('==>' + payment);
    this.spinner.hide();
    payhere.startPayment(payment);
  }
  setDeliveryDetails() {
    this.order.deliveryDto = {
      id: '',
      name: this.form.name,
      address: this.form.address,
      city: this.form.city,
      district: this.form.district,
      postalCode: '',
      mobileNo: this.form.contactNo,
      deliveryNote: this.form.message,
      deliveryDate: this.form.date,
    };
  }
  setPaymentDetails() {
    this.order.paymentDto = {
      id: '',
      amount: this.totalPrice,
      method: this.form.type,
      paymentStatus: '',
    };
  }

  setCustomerDetails() {
    this.order.customerDto.id = this.userId;
    this.order.customerDto.email = this.form.email;
    this.order.customerDto.name = this.form.name;
  }

  setItemDtoDetails() {
    let item: ItemDTO = new ItemDTO();
    this.cartItemList.forEach((ci) => {
      item.id = ci.item.id;
      item.qty = ci.count;
      this.order.itemDtoList.push(item);
    });
  }
  sendOrder() {
    this.order.userId = this.userId;
    this.orderService.addOrder(this.order).subscribe(
      (res) => {
        //alert('Added');
        console.log('==>' + res);
        this.isOrderSuccessful = true;
        this.router.navigate(['']);
      },
      (error) => {
        // error.error;
        this.isOrderSuccessful = false;
        this.isOrderFail = true;
        this.spinner.hide();
      }
    );
  }

  getItemsAsCommaSeperatedList() {
    let str = '';
    this.cartItemList.forEach((c) => {
      str += c.item.id + ' ' + c.count + '*' + c.item.price + ', ';
    });
    return str;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
/*
Delivery
id string = '';
  name: string = '';
  address: string = '';
  city: string = '';
  district: string = '';
  postalCode: string = '';
  mobileNo: string = '';
  deliveryNote: string = '';
  deliveryDate: any;

//payment
  id: string = '';
  amount: number = 0;
  method: string = '';
  paymentStatus: string = '';

  //pay
  id: string = '';
  orderDate: any;
  paymentDto: Payment = new Payment();
  DeliveryDto: Delivery = new Delivery();
  itemDtoList: Array<CheckoutItem> = new Array<CheckoutItem>();


*/
