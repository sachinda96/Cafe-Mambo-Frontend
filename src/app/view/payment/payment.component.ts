import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { Order } from 'src/app/model/order';
import { Delivery } from 'src/app/model/delivery';
import { Payment } from 'src/app/model/payment';
import {CheckoutItem} from "../../model/checkout-item";
import {TokenStorageService} from "../../service/token-storage.service";

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
  checkoutItemList:Array<CheckoutItem> = new Array<CheckoutItem>();
  cartItems: Array<CartItem> = new Array<CartItem>();


  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenStorageService:TokenStorageService
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

    this.checkoutItemList = new Array<CheckoutItem>();
    this.cartItems = this.cartService.getItems();

    this.cartItems.forEach(e=>{
      let checkoutItem = new CheckoutItem();
      checkoutItem.id = e.item.id;
      checkoutItem.qty = e.count;
      this.checkoutItemList.push(checkoutItem);
    })

    this.order.itemDtoList = this.checkoutItemList;
    this.order.paymentDto.method =  this.form.type;
    this.order.userId =  this.tokenStorageService.getUserId();
    console.log(this.order)
    this.orderService.addOrder(this.order).subscribe(
      res=>{
        alert("Added")
      },
      error => {
        error.error;
      }
    );

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
