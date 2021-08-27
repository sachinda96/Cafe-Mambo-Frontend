import { Delivery, DeliveryDetailsEntity } from './delivery';
import { Payment, paymentEntity } from './payment';
import { CheckoutItem } from './checkout-item';
import { Customer } from './customer';
import { Item, ItemDTO } from './item';
import { UserEntity } from './user';

// export interface Order {
//   id: string;
//   orderDate: any;
//   total: number;
//   status: string;
//   createBy: string;
//   createDate: any;
//   updateBy: string;
//   updateDate: any;
//   paymentEntity: Payment;
//   userEntity: UserEntity;
// }

//user-key

export class Order {
  id: string = '';
  orderDate: Date = new Date();
  userId: string | null = '';
  paymentDto: Payment = new Payment();
  deliveryDto: Delivery = new Delivery();
  itemDtoList: Array<CheckoutItem> = new Array<CheckoutItem>();

  constructor() {}
}

export class OrderDTO {
  id: string = '';
  total: number = 0.0;
  customerDto: Customer = new Customer();
  orderDate: Date = new Date();
  paymentDto: Payment = new Payment();
  deliveryDto: Delivery = new Delivery();
  itemDtoList: Array<ItemDTO> = new Array<ItemDTO>();
  userId: string = '';
  //i need the count as well
}

// private String id;
// private Date orderDate;
// private PaymentDto paymentDto;
// private DeliveryDto deliveryDto;
// private List<ItemDto> itemDtoList;
// private String userId;

export class PlaceOrderDTO {
  id: string = '';
  orderDate: Date = new Date();
  paymentDto: Payment = new Payment();
  deliveryDto: Delivery = new Delivery();
  itemDtoList: Array<ItemDTO> = new Array<ItemDTO>();
  userId: string = '';
}

export class OrderCustomer {
  createBy: string = '';
  createDate: string = '';
  deliveryDetailsEntity: DeliveryDetailsEntity = new DeliveryDetailsEntity();
  id: string = '';
  orderDate: Date = new Date();
  orderStatus: string = '';
  paymentEntity: paymentEntity = new paymentEntity();
  status: string = '';
  total: number = 0;
  updateBy: string = '';
  updateDate: Date = new Date();
  userEntity: UserEntity = new UserEntity();

  constructor() {}
}
