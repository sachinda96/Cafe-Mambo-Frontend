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
  itemId: string = '';
  max: number = 5;
  value: number = 3;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private routerActive: ActivatedRoute,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.routerActive.params.subscribe((params) => {
      if (params.itemId != null || params.itemId != undefined) {
        this.itemId = params.itemId;
        this.getItem(this.itemId);
        console.log(this.itemId);
      }
    });

    console.log(this.itemId);
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe(
      (res) => {
        this.item = res;
        console.log(res);
        this.value = res.rateCount != undefined ? res.rateCount : 3;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
