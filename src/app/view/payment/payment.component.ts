import {
  Component,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import { OrderDTO as PlaceOrderDTO } from 'src/app/model/order';
import { Delivery } from 'src/app/model/delivery';
import { Payment } from 'src/app/model/payment';
import { TokenStorageService } from '../../service/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UuidService } from 'src/app/service/uuid.service';
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
  order: PlaceOrderDTO = new PlaceOrderDTO();

  showDeliveryDetails = true;
  showSuccessModal = false;
  cardItemArray: string[] = [];
  userId: any = '';
  isPaymentSuccess: boolean = false;

  modalRef: BsModalRef = new BsModalRef();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private viewRef: ViewContainerRef,
    private modalService: BsModalService,
    private router: Router,
    private uuidService: UuidService
  ) {}

  ngOnInit(): void {
    this.cartItemList = this.cartService.getItems();
    this.cartItemList = this.cartService.getItems();
    this.totalQuantity = this.cartService.getItemsTotalCount();
    this.totalPrice = this.cartService.getItemsTotalPrice();
    this.userId = this.tokenStorageService.getUserId();

    if (this.userId == null) this.router.navigate(['']);
    if (this.totalQuantity == 0) this.router.navigate(['']);
    payhere.onCompleted = function onCompleted(orderId: any) {
      console.log('Payment completed. OrderIDss:' + orderId);
      this.isPaymentSuccess = true;
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
    id: this.uuidService.generateUUID(),
  };

  isOrderSuccessful = false;
  isOrderFail = false;
  isPaymentSuccessful = false;
  errorMessage = '';
  Message = '';

  onSubmit(): void {
    this.spinner.show();
    this.modalRef.hide();

    this.order.orderDate = new Date();
    this.order.id = this.form.id;
    this.order.userId = this.userId;

    this.setDeliveryDetails();
    this.setPaymentDetails();
    this.setItemDtoDetails();

    if (this.form.type == 'card') {
      this.paynow();
    } else if (this.form.type == 'cod') {
      this.sendOrder();
    }
    this.spinner.hide();
  }

  paynow() {
    // Put the payment variables here

    var payment = {
      sandbox: true,
      merchant_id: MERCHANT_ID, // Replace your Merchant ID
      return_url: RETURN_URL, // Important
      cancel_url: CANCEL_URL, // Important
      notify_url: NOTIFY_URL,
      order_id: this.form.id,
      items: this.getItemsAsCommaSeperatedList(),
      currency: 'LKR',
      amount: this.order.paymentDto.amount,
      first_name: this.form.name,
      last_name: '',
      email: '',
      phone: this.form.contactNo,
      address: this.form.address,
      city: this.form.city,
      country: 'Sri Lanka',
      delivery_address: this.form.address,
      delivery_city: this.form.city,
      delivery_country: 'Sri Lanka',
      uid: this.userId,
      custom_2: '',
    };

    this.spinner.hide();
    payhere.startPayment(payment);

    //if (this.isPaymentSuccess) this.sendOrder();
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

  setItemDtoDetails() {
    let item: ItemDTO = new ItemDTO();
    this.cartItemList.forEach((ci) => {
      item.id = ci.item.id;
      item.qty = ci.count;
      this.order.itemDtoList.push(item);
    });
  }
  sendOrder() {
    console.log(this.order);
    // this.orderService.addOrder(this.order).subscribe(
    //   (res) => {
    //     this.isOrderSuccessful = true;
    //     this.isOrderFail = false;
    //     this.spinner.hide();
    //     this.clearAll();
    //     setTimeout(() => {
    //       this.router.navigate(['']);
    //     }, 10000);
    //     // this.router.navigate(['']);
    //   },
    //   (error) => {
    //     // error.error;
    //     console.log(error);
    //     this.isOrderSuccessful = false;
    //     this.isOrderFail = true;
    //     this.spinner.hide();
    //   }
    // );
  }

  getItemsAsCommaSeperatedList() {
    let str = '';
    this.cartItemList.forEach((c) => {
      str += c.item.id + ' ' + c.count + '*' + c.item.price + ', ';
    });
    return str;
  }

  openModal(template: TemplateRef<any>) {
    //this.sendOrder();
    this.modalRef = this.modalService.show(template);
  }

  clearAll() {
    this.form = {
      name: null,
      email: null,
      contactNo: null,
      address: null,
      city: null,
      district: null,
      message: '',
      type: '',
      date: null,
      id: null,
    };
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
