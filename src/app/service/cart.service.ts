import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Item[] = [];
  constructor(private http: HttpClient) {}

  //   Define methods to add items to the cart, return cart items, and clear the cart items.

  addToCart(product: Item) {
    const index = this.items.findIndex((i) => i.id === product.id);
    console.log(index);
    if (index === -1) this.items.push(product);
    else {
      // Handle if the product already exists in cart
    }
    console.log(this.items);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}
