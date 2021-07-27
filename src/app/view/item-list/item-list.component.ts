import { Component, OnInit } from '@angular/core';
import {
  items,
  Item,
  CartItem,
  mocktailItems,
  cocktailItems,
  appetizerItems,
} from '../../model/items';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { BASE_URL } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  items = items;
  mocktailItems = mocktailItems;
  cocktailItems = cocktailItems;
  appetizerItems = appetizerItems;
  path: string | undefined;

  isMocktail = false;
  isCocktail = true;
  isAppetizer = false;

  /**/

  v: any;
  page = 1;

  json = {
    totalItems: 12,
    items: items,
    totalPages: 3,
    currentPage: 1,
  };

  ngOnInit(): void {
    this.v = this.http.get<{
      id: number;
      name: string;
      type: string;
      subType: string;
      price: number;
      description: string;
      imageUrl: string;
    }>('');

    console.log(this.route.parent?.snapshot?.paramMap);
  }

  addToCart(item: Item) {
    // alert(item.name + ' added');
    this.cartService.addToCart(item);
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  getItemsByType(type: string) {
    return this.http.get(BASE_URL + '/items?type=' + type);
  }

  onClickItemTypeChange(type: string) {
    this.location.replaceState('/shop/' + type);
    this.enableItemType(type);
  }

  enableItemType(type: string) {
    switch (type) {
      case 'cocktail':
        this.isCocktail = true;
        this.isMocktail = false;
        this.isAppetizer = false;
        break;
      case 'mocktail':
        this.isCocktail = false;
        this.isMocktail = true;
        this.isAppetizer = false;
        break;
      case 'appetizer':
        this.isCocktail = false;
        this.isMocktail = false;
        this.isAppetizer = true;
        break;
      default:
        break;
    }
  }
}
