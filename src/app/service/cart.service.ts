import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { Item } from '../model/item';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[] = [];
  cartItems: Array<CartItem> = new Array<CartItem>();
  count: number = 0;
  constructor(private http: HttpClient) {}

  addToCart(item: Item) {
    const index = this.cartItems.findIndex((c) => c.item.id === item.id);

    let cartItem: CartItem;

    if (index === -1) {
      cartItem = {
        item: item,
        count: 1,
      };

      this.cartItems.push(cartItem);
    } else {
      // Handle if the product already exists in cart
      this.cartItems[index].count += 1;
    }

    this.count = this.cartItems.length;
    console.log(this.count);
  }

  decrementFromCart(itemId: string | undefined) {
    const index = this.cartItems.findIndex((c) => c.item.id === itemId);

    if (this.cartItems[index].count != 1) {
      this.cartItems[index].count--;
    }
  }

  RemoveFromCart(itemId: string | undefined) {
    const index = this.cartItems.findIndex((c) => c.item.id === itemId);

    if (index == 0) {
      this.cartItems = this.cartItems.slice(index + 1);
    } else if (index == this.cartItems.length - 1) {
      this.cartItems = this.cartItems.slice(0, index);
    } else {
      let arr1 = this.cartItems.slice(0, index);
      let arr2 = this.cartItems.slice(index + 1);

      this.cartItems = arr1.concat(arr2);
    }
  }

  getItems() {
    return this.cartItems;
  }

  getItemsTotalCount() {
    if (this.cartItems.length == 0) return 0;
    else {
      let count = 0;
      this.cartItems.forEach((i) => {
        count += i.count;
      });
      console.log(count);
      return count;
    }
  }

  getItemsTotalPrice() {
    if (this.cartItems.length == 0) return 0;
    else {
      let totPrice = 0;
      this.cartItems.forEach((i) => {
        totPrice += i.count * i.item.price;
      });
      return totPrice;
    }
  }
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }

  getDeliveryCharges() {
    return this.http.get('/assets/shipping.json');
  }

  getTaxValues() {
    return this.http.get(BASE_URL + '/cart/tax');
  }
}
