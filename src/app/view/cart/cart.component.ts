import { Component, OnInit } from '@angular/core';
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
}
