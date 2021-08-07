import { DeliveryDetailsEntity, DeliveryDto } from './delivery';
import { PackageEntity } from './packages';
import { PaymentDto, PaymentEntity } from './payment';
import { UserEntity } from './user';

export interface Reservation {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  location: string;
  message: string;
  type: string;
  date: Date;
}

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
export interface EventBookingEntity {
  id: string;
  bookDate: any;
  createby: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
  paymentEntity: PaymentEntity;
  deliveryDetailsEntity: DeliveryDetailsEntity;
  userEntity: UserEntity;
}

export interface EventBookingDetailsEntity {
  id: string;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
  eventBookingEntity: EventBookingEntity;
  packageEntity: PackageEntity;
}

export interface EventBookingDto {
  id: string;
  userId: string;
  bookDate: any;
  packageId: string;
  delivery: DeliveryDto;
  payment: PaymentDto;
}
