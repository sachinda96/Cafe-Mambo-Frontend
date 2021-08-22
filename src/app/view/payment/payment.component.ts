import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { Delivery } from 'src/app/model/delivery';
import { Payment } from 'src/app/model/payment';
import { CheckoutItem } from '../../model/checkout-item';
import { TokenStorageService } from '../../service/token-storage.service';
import {
  BASE_URL,
  CANCEL_URL,
  MERCHANT_ID,
  NOTIFY_URL,
  RETURN_URL,
} from 'src/environments/environment';
declare var payhere: any;

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
  order: Order = new Order();
  checkoutItemList: Array<CheckoutItem> = new Array<CheckoutItem>();
  cartItems: Array<CartItem> = new Array<CartItem>();
  showDeliveryDetails = true;
  showSuccessModal = false;
  cardItemArray: string[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService
  ) {
    payhere.onCompleted = function onCompleted(orderId: any) {
      console.log('Payment completed. OrderID:' + orderId);
      this.sendOrder();
    };

    payhere.onDismissed = function onDismissed() {
      console.log('Payment dismissed');
    };

    payhere.onError = function onError(error: any) {
      console.log('Error:' + error);
    };
  }

  ngOnInit(): void {
    this.cartItemList = this.cartService.getItems();
    this.totalQuantity = this.cartService.getItemsTotalCount();
    this.totalPrice = this.cartService.getItemsTotalPrice();
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

  cardForm: any = {
    nameOnCard: null,
    creditCardNo: null,
    expMonth: null,
    expYear: null,
    CVV: null,
  };

  isOrderSuccessful = false;
  isPaymentSuccessful = false;
  errorMessage = '';

  onSubmit(): void {
    console.log(this.cardForm);
    this.checkoutItemList = new Array<CheckoutItem>();
    this.cartItems = this.cartService.getItems();
    this.setDeliveryDetails();
    this.setPaymentDetails();

    this.cartItems.forEach((e) => {
      let checkoutItem = new CheckoutItem();
      checkoutItem.id = e.item.id;
      checkoutItem.qty = e.count;
      this.checkoutItemList.push(checkoutItem);
    });

    this.order.itemDtoList = this.checkoutItemList;
    this.order.paymentDto = this.payment;
    this.order.deliveryDto = this.delivery;
    this.order.userId = this.tokenStorageService.getUserId();
    console.log(this.order);

    if (this.form.type != 'cod' && this.isOrderSuccessful) {
      this.paynow();
    } else {
      this.sendOrder();
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
    payhere.startPayment(payment);
  }
  setDeliveryDetails() {
    this.delivery = {
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
    this.payment = {
      id: '',
      amount: this.totalPrice,
      method: this.form.type,
      paymentStatus: '',
    };
  }

  addOrder() {}

  getOrderByUserIdAndDate(uid: string, date: Date) {
    this.orderService.getOrderByUserAndDate(uid, date).subscribe(
      (data) => {
        //  this.order = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendOrder() {
    this.orderService.addOrder(this.order).subscribe(
      (res) => {
        //alert('Added');
        console.log('==>' + res);
        this.isOrderSuccessful = true;
      },
      (error) => {
        // error.error;
        this.isOrderSuccessful = false;
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
