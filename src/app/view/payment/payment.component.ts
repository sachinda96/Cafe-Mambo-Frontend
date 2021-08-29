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
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
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
  play: any;
  interval: any;
  count: any;

  namePattern = '^[a-z]$';
  pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  mobnumPattern = '^((\\+94-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  //Create FormGroup
  requiredForm: FormGroup | any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService,
    private spinner: NgxSpinnerService,
    private viewRef: ViewContainerRef,
    private modalService: BsModalService,
    private router: Router,
    private uuidService: UuidService,
    private fb: FormBuilder
  ) {
    this.myForm();
  }

  ngOnInit(): void {
    this.cartItemList = this.cartService.getItems();
    this.cartItemList = this.cartService.getItems();
    this.totalQuantity = this.cartService.getItemsTotalCount();
    this.totalPrice = this.cartService.getItemsTotalPrice();
    this.userId = this.tokenStorageService.getUserId();

    if (this.userId == null) this.router.navigate(['']);
    if (this.totalQuantity == 0) this.router.navigate(['']);

    payhere.onCompleted = function onCompleted(
      orderId: any,
      cartService: CartService
    ) {
      console.log('Payment completed. OrderIDss:' + orderId);
      console.log(this.isPaymentSuccess);
      this.isPaymentSuccess = true;

      var url = BASE_URL + '/order';

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

        window.location.replace(BASE_URL);
        window.location.reload();
      };

      var data = sessionStorage.getItem('ORDER');

      xhr.send(data);
      // console.log(this.sendOrder());
      //this.sendOrder();
    };

    payhere.onDismissed = function onDismissed() {
      console.log('Payment dismissed');
    };

    payhere.onError = function onError(error: any) {
      console.log('Error:' + error);
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
    id: null,
  };

  isOrderSuccessful = false;
  isOrderFail = false;
  isPaymentSuccessful = false;
  errorMessage = '';
  Message = '';

  onSubmit(): void {
    this.isOrderSuccessful = false;
    this.isOrderFail = false;
    this.spinner.show();
    this.modalRef.hide();
    this.setFormDetails();
    console.log(this.form);

    if (this.checkValidity()) {
      this.order.orderDate = new Date();
      this.order.id = this.form.id;
      this.order.userId = this.userId;

      this.setDeliveryDetails();
      this.setPaymentDetails();
      this.setItemDtoDetails();

      if (this.form.type == 'card') {
        window.sessionStorage.setItem('ORDER', JSON.stringify(this.order));
        this.paynow();
      } else if (this.form.type == 'cod') {
        this.sendOrder();
      }
      this.spinner.hide();
    } else {
      this.isOrderSuccessful = false;
      this.isOrderFail = true;
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

    console.log(this.isPaymentSuccess);
    this.spinner.hide();
    payhere.startPayment(payment);
    console.log(payhere.onCompleted);

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
      item.price = ci.item.price;
      this.order.itemDtoList.push(item);
    });
  }
  sendOrder() {
    console.log(this.order);
    this.orderService.addOrder(this.order).subscribe(
      (res) => {
        this.isOrderSuccessful = true;
        this.isOrderFail = false;
        this.spinner.hide();
        this.clearAll();
        this.cartService.clearCart();
        setTimeout(() => {
          this.router.navigate(['']);
        }, 10000);
        // this.router.navigate(['']);
        return true;
      },
      (error) => {
        // error.error;
        console.log(error);
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
  setFormDetails() {
    this.form = {
      name: this.requiredForm.get('name').value,
      email: '',
      contactNo: this.requiredForm.get('contactNo').value,
      address: this.requiredForm.get('address').value,
      city: this.requiredForm.get('city').value,
      district: this.requiredForm.get('district').value,
      message: '',
      type: this.requiredForm.get('type').value,
      date: new Date(),
      id: this.uuidService.generateUUID(),
    };
    console.log(this.requiredForm.get('name'));
  }

  checkValidity() {
    console.log(this.requiredForm.get('name').status.localeCompare('INVALID'));
    if (
      this.requiredForm.get('name').status.localeCompare('INVALID') == 0 ||
      this.requiredForm.get('contactNo').status.localeCompare('INVALID') == 0 ||
      this.requiredForm.get('address').status.localeCompare('INVALID') == 0 ||
      this.requiredForm.get('city').status.localeCompare('INVALID') == 0 ||
      this.requiredForm.get('district').status.localeCompare('INVALID') == 0 ||
      this.requiredForm.get('type').status.localeCompare('INVALID') == 0
    ) {
      return false;
    }
    return true;
  }
  //Create required field validator for name
  myForm() {
    this.requiredForm = this.fb.group({
      name: [
        '',
        Validators.required,
        Validators.pattern('^[a-zA-Z]$'),
        Validators.minLength(8),
        Validators.maxLength(40),
      ],
      address: [
        '',
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{8,60}$'),
        Validators.minLength(8),
        Validators.maxLength(40),
      ],
      city: [
        '',
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]{3,20}$'),
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
      district: [
        '',
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(8),
        Validators.maxLength(20),
      ],
      contactNo: [
        '',
        Validators.required,
        Validators.pattern(this.mobnumPattern),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      type: ['', Validators.required],
    });
  }

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.form.type = this.requiredForm.get('type');
    }, 1000);
  }
}

// function startTimer() {
//   throw new Error('Function not implemented.');
// }
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
