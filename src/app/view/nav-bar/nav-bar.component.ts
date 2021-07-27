import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  private roles: string[] = [];
  currentUser: any;
  isLoggedIn = false;
  username?: string;
  cartCount = 0;

  constructor(
    public router: Router,
    public token: TokenStorageService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    alert(this.token.getToken());
    this.isLoggedIn = this.token.getToken() ? false : true;
    this.cartCount = this.cartService.getItemsTotalCount();

    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.roles = this.currentUser.roles;
      this.username = this.currentUser.username;
    }
  }

  logout(): void {
    this.token.signOut();
    //this.currentUser = null;
    window.location.reload();
  }
}
