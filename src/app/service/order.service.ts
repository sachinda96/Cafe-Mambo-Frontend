import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';

import { Order, OrderCustomer, OrderDTO, PlaceOrderDTO } from '../model/order';
import { ShopOrder } from '../model/shop-order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // getAllOrders() {
  //   return this.http.get<Array<OrderDTO>>(BASE_URL + '/order/getAllorders');
  // }
  getAllOrdersByUser(uid: string | null) {
    return this.http.get<OrderCustomer[]>(
      BASE_URL + '/order/allOrderByCustomer/' + uid
    );
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
    return this.http.get<OrderDTO>(BASE_URL + '/order' + uid);
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

  // addShopOrder(order: PlaceOrderDTO) {
  //   return this.http.post(BASE_URL + '/order', order);

  addShopOrder(shopOrder: ShopOrder) {
    return this.http.post(BASE_URL + '/shoporder/placeorder', shopOrder);
  }
}
