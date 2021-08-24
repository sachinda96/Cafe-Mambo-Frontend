import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { Order, OrderDTO } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // getAllOrders() {
  //   return this.http.get<Array<OrderDTO>>(BASE_URL + '/order/getAllorders');
  // }
  getAllOrdersByUser(uid: string | null) {
    return this.http.get<OrderDTO[]>(BASE_URL + '/order/getAllorders/' + uid);
  }
  getAllOrdersByDate(date: any) {
    return this.http.get<OrderDTO[]>(BASE_URL + '/order/getAllorders/' + date);
  }

  getOrderByUserAndDate(uid: string, date: Date) {
    return this.http.get<OrderDTO>(
      BASE_URL + '/order/getOrderById/' + uid + '/' + date
    );
  }
  getPendingOrdersByUser(uid: string) {
    return this.http.get<OrderDTO>(
      BASE_URL + '/order/getPendingOrdersByUser/' + uid
    );
  }

  getOrderById(id: string) {
    return this.http.get<OrderDTO>(BASE_URL + '/order/getAllOrdersById/' + id);
  }
  addOrder(order: OrderDTO) {
    return this.http.post(BASE_URL + '/order', order);
  }
  updateOrder(order: Order) {
    return this.http.post(BASE_URL + '/order/cancel', order);
  }
}
