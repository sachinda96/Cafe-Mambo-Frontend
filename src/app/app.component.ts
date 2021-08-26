import { Component } from '@angular/core';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Cafe-Mambo-Frontend';
  content = '';
  cartCount = 0;
  count = 0;

  constructor(private cartService: CartService) {}

  setContent(content: string): void {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  updateCartCount(count: number) {
    this.cartCount = this.cartService.getItemsTotalCount();
    alert(this.cartCount);
  }
  countChangedHandler(count: number) {
    this.cartCount = count;
    console.log(count);
  }
}
