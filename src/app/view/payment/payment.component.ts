import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { Delivery } from 'src/app/model/delivery';
import { Payment } from 'src/app/model/payment';

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

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cartItemList = this.cartService.getItems();
    this.totalQuantity = this.cartService.getItemsTotalCount();
    this.totalPrice = this.cartService.getItemsTotalPrice();
  }

  form: any = {
    name: null,
    email: null,
    contactNo: null,
    street: null,
    city: null,
    district: null,
    message: '',
    type: '',
    date: null,
  };

  isSuccessful = false;
  errorMessage = '';

  onSubmit(): void {
    //alert(this.form.name);
    console.log(this.form);
    this.order.orderDate = new Date().toString();
  }

  setDelivery() {
    this.delivery.name = this.form.name;
    this.delivery.street = this.form.street;
    this.delivery.city = this.form.city;
    this.delivery = this.form.street;
  }
}

/*
Delivery
id: string = '';
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
