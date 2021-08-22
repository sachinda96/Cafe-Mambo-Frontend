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

  constructor(private cartService: CartService) {}

  setContent(content: string): void {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  getCartCount() {
    return this.cartService.getItemsTotalCount();
  }
}
