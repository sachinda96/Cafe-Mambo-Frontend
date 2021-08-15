import { Delivery } from './delivery';
import { Item } from './item';
import { Payment } from './payment';
import { UserEntity } from './user';

export interface Order {
  id: string;
  orderDate: any;
  total: number;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
  paymentEntity: Payment;
  userEntity: UserEntity;
}

//user-key

export class Order {
  id: string = '';
  orderDate: any;
  paymentDto: Payment = new Payment();
  DeliveryDto: Delivery = new Delivery();
  itemDtoList: Array<Item> = new Array<Item>();

  constructor() {}
}
