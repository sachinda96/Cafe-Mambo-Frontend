import { Delivery } from './delivery';
import { CartItem } from './cart-item';
import { Payment } from './payment';
import { CheckoutItem } from './checkout-item';

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
  orderDate: any;
  paymentDto: Payment = new Payment();
  DeliveryDto: Delivery = new Delivery();
  itemDtoList: Array<CheckoutItem> = new Array<CheckoutItem>();

  constructor() {}
}
