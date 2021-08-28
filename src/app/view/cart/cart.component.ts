import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Item } from '../../model/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private tokenService: TokenStorageService
  ) {}
  cartItems = this.cartService.cartItems;
  totQuantity = this.cartService.getItemsTotalCount();
  totPrice = this.cartService.getItemsTotalPrice();
  isAlert = false;
  // items:
  ngOnInit(): void {
    this.checkLoggedIn();
    this.isAlert = false;
    // items:
  }

  incrementItem(item: Item) {
    this.cartService.addToCart(item);
    this.updateInfo();
  }

  decrementItem(itemId: string | undefined) {
    this.cartService.decrementFromCart(itemId);
    this.updateInfo();
  }

  checkLoggedIn() {
    this.isLoggedIn =
      Object.keys(this.tokenService.getUser()).length !== 0 ? true : false;
  }

  removeItem(itemId: string | undefined) {
    this.cartService.RemoveFromCart(itemId);
    this.cartItems = this.cartService.getItems();
    this.updateInfo();
  }

  removeAllItems() {
    this.cartItems = this.cartService.clearCart();
    this.totQuantity = 0;
    this.totPrice = 0;
  }

  updateInfo() {
    this.totQuantity = this.cartService.getItemsTotalCount();
    this.totPrice = this.cartService.getItemsTotalPrice();
  }

  showHideAlert(val: boolean) {
    this.isAlert = val;
  }
}
