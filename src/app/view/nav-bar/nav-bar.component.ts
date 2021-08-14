import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Item, ItemDto } from 'src/app/model/items';
import { CartService } from 'src/app/service/cart.service';
import { TokenStorageService } from '../../service/token-storage.service';
import {CategoryService} from "../../service/category.service";

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
  cartCount = 1;
  itemList: Array<ItemDto> = new Array();
  categoryList: Array<Category> = new Array();

  constructor(
    public router: Router,
    public token: TokenStorageService,
    public cartService: CartService,
    private categoryService:CategoryService
  ) {
    this.cartCount =  cartService.count;

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
      res=>{
        console.log(res);
        this.categoryList = res;
      },error => {
        console.log(error)
      }
    );

    let categoryDto = new Category();
    categoryDto.id = '1';
    categoryDto.name = 'Cocktails';

    this.categoryList.push(categoryDto);

    let categoryDto1 = new Category();
    categoryDto1.id = '2';
    categoryDto1.name = 'Mocktails';

    this.categoryList.push(categoryDto1);

    let categoryDto2 = new Category();
    categoryDto2.id = '3';
    categoryDto2.name = 'Appetizers';

    this.categoryList.push(categoryDto2);
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

  updateCartCount(count:any){
    this.cartCount = count;
  }
}
