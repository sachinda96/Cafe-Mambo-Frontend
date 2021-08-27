import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ItemService } from 'src/app/service/item.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Item } from 'src/app/model/item';
import { NgxSpinnerService } from 'ngx-spinner';

export class ItemRating {
  item: Item = new Item();
  index: number = 0;
  constructor() {}
}
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  @Output() cartCountChanged: EventEmitter<number> = new EventEmitter();

  itemList: Array<Item> = new Array<Item>();
  categoryId: string = '';
  pageNumbers: number[] = [];
  max = 10;
  rate = 7;
  isReadonly = true;
  k = 0;
  ratingArrayList: Array<number> = new Array<number>();
  itemRatingArray: ItemRating[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private routerActive: ActivatedRoute,
    private itemService: ItemService,
    private spinner: NgxSpinnerService
  ) {}

  path: string | undefined;

  ngOnInit(): void {
    this.spinner.show();
    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.categoryId = params.id;
        this.getItemsByPage(0, 8, params.id);
      }
    });

    this.countByCategory(this.categoryId);
    // this.fillRatingArray();
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
    let cartCount = this.cartService.getItemsTotalCount();
    this.cartCountChanged.emit(cartCount);
  }

  getItemsByPage(index: any, size: any, id: any) {
    this.spinner.show();
    this.itemService.getAllByPageIndexAndSize(index, size, id).subscribe(
      (res) => {
        this.itemList = res;
        this.spinner.hide();
        //this.fillRatingArray();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  nextIndexList(index: any) {
    this.getItemsByPage(index - 1, 8, this.categoryId);
  }

  private countByCategory(categoryId: string) {
    this.itemService.countByCategory(categoryId).subscribe(
      (res) => {
        // alert(res);
        let count = 0;
        for (let i = 0; i < res; i++) {
          count = count + 1;
          this.pageNumbers.push(count);
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  fillRatingArray() {
    this.itemList.forEach((i) => {
      if (i.rateCount) {
        console.log('===>');
        this.ratingArrayList.push(i.rateCount);
        let itm: ItemRating = new ItemRating();
        itm.item = i;
        itm.index = this.k++;
        this.itemRatingArray.push(itm);
      }
    });
  }
}
