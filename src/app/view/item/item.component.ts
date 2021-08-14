import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Item } from '../../model/item';
import { ItemService } from '../../service/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item: Item = new Item();
  itemId: String = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private routerActive: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {}

  addToCart(item: Item) {
    //this.cartService.addToCart(item);
  }

  private getItem(itemId: String) {
    this.itemService.getItem(itemId).subscribe(
      (res) => {
        this.item = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
