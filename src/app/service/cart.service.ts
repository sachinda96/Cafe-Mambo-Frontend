import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, CartItem } from '../model/items';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[] = [];
  cartItems: CartItem[] = [];
  constructor(private http: HttpClient) {}

  //   Define methods to add items to the cart, return cart items, and clear the cart items.

  addToCart(item: Item) {
    //alert(item);
    const index = this.cartItems.findIndex((c) => c.item.id === item.id);

    let cartItem: CartItem;

    console.log(index);
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

    console.log(this.items);
    console.log(this.cartItems);
    console.log('len' + this.cartItems.length);
  }

  deleteFromCart(item: Item) {
    const index = this.cartItems.findIndex((c) => c.item.id === item.id);

    if (this.cartItems[index].count == 1) {
      this.cartItems.splice(index, 1);
      console.log(this.cartItems);
    } else {
      this.cartItems[index].count--;
    }

    console.log(index);
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
      console.log(totPrice);
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
