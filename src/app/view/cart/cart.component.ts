import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/items';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  cartItems = this.cartService.cartItems;
  totQuantity = this.cartService.getItemsTotalCount();
  totPrice = this.cartService.getItemsTotalPrice();
  // items:
  ngOnInit(): void {}

  incrementItem(item: Item) {
    this.cartService.addToCart(item);
    this.totQuantity = this.cartService.getItemsTotalCount();
    this.totPrice = this.cartService.getItemsTotalPrice();
  }

  decrementItem(item: Item) {
    this.cartService.deleteFromCart(item);
    this.totQuantity = this.cartService.getItemsTotalCount();
    this.totPrice = this.cartService.getItemsTotalPrice();
  }
}
