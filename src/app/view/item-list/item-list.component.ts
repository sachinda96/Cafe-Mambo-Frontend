import { OnInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ItemService } from 'src/app/service/item.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  itemList: Array<Item> = new Array<Item>();
  categoryId: string = '';
  pageNumbers: Array<number> = new Array<number>();

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private routerActive: ActivatedRoute,
    private itemService: ItemService
  ) {}

  path: string | undefined;

  ngOnInit(): void {
    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.categoryId = params.id;
        this.getItemsByPage(0, 8, params.id);
      }
    });

    this.countByCategory(this.categoryId);
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  getItemsByPage(index: any, size: any, id: any) {
    this.itemService
      .getAllByPageIndexAndSize(index, size, id)
      .subscribe((res) => {
        console.log(res);
        this.itemList = res;
      });
  }

  nextIndexList(index: any) {
    this.getItemsByPage(index - 1, 8, this.categoryId);
  }

  private countByCategory(categoryId: string) {
    this.itemService.countByCategory(categoryId).subscribe(
      (res) => {
        let count = 0;
        for (let i = 0; i < res; i++) {
          count = count + 1;
          this.pageNumbers.push(count);
        }
      },
      (error) => {
        error.error;
      }
    );
  }
}
