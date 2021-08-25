import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Item } from 'src/app/model/item';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { TokenStorageService } from '../../service/token-storage.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    './nav-bar.component.css',
    '../../../assets/css/main.css',
    '../../../assets/css/libs.min.css',
    '../../../assets/cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css',
  ],
})
export class NavBarComponent implements OnInit {
  private roles: string[] = [];
  currentUser: any;
  isLoggedIn = false;
  username?: string;

  cartCount = 0;
  itemList: Array<Item> = new Array();

  categoryList: Array<Category> = new Array();

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(
    public router: Router,
    public token: TokenStorageService,

    public cartService: CartService,
    private categoryService: CategoryService
  ) {
    this.cartCount = cartService.count;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.token.getToken() ? true : false;
    this.cartCount = this.cartService.getItemsTotalCount();

    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.roles = this.currentUser.roles;
      this.username = this.currentUser.username;
    }

    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryList = new Array<Category>();
    this.categoryService.getAllCategory().subscribe(
      (res) => {
        console.log(res);
        this.categoryList = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.token.signOut();
    //this.currentUser = null;
    window.location.reload();
  }

  routeItemByCategory(id: string) {
    console.log(id);
    this.router.navigate(['/shop/' + id]);
  }

  routeToDashboard() {
    this.router.navigate(['/' + this.token.getUserId + '/dashboard']);
  }
  updateCartCount(count: any) {
    this.cartCount = count;
  }
}
