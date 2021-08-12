import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  items,
  Item,
  mocktailItems,
  cocktailItems,
  appetizerItems,
} from '../../model/items';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item: Item | undefined;

  cocktailItems = cocktailItems;
  mocktailItems = mocktailItems;
  appetizerItems = appetizerItems;
  isCocktail = false;
  isMocktail = false;
  isAppetizer = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // First get the item id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const itemIdFromRoute = Number(routeParams.get('itemId'));

    // Find the product that correspond with the id provided in route.
    // this.item = items.find((item) => item.id === itemIdFromRoute);
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }
}

/*
items = [cocktailItems, mocktailItems, appetizerItems];

if (this.item != undefined) this.findActive(this.item);
findActive(item: Item) {
    switch (item.subType.toLowerCase()) {
      case 'cocktail':
        this.isCocktail = true;
        this.isMocktail = false;
        this.isAppetizer = false;

        for (let i = this.cocktailItems.length; i > 3; i--) {
          this.cocktailItems.pop();
        }
        break;
      case 'mocktail':
        this.isCocktail = false;
        this.isMocktail = true;
        this.isAppetizer = false;

        for (let i = this.mocktailItems.length; i > 3; i--) {
          this.mocktailItems.pop();
        }
        break;
      case 'appetizer':
        this.isCocktail = false;
        this.isMocktail = false;
        this.isAppetizer = true;

        for (let i = this.appetizerItems.length; i > 3; i--) {
          this.appetizerItems.pop();
        }
        break;
      default:
        break;
    }
  }



*/
