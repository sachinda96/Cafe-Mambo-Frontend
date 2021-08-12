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
