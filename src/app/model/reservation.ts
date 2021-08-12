import { Delivery } from './delivery';
import { Payment } from './payment';

export interface EventBooking {
  id: string;
  userId: string;
  bookDate: any;
  packageId: string;
  delivery: Delivery;
  payment: Payment;
}

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
