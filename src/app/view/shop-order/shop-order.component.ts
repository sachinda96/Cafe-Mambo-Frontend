import {
  OnInit,
  Component,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ItemService } from 'src/app/service/item.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Item } from 'src/app/model/item';
import { SITE } from 'src/environments/environment';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

export class ItemRating {
  item: Item = new Item();
  index: number = 0;
  constructor() {}
}

@Component({
  selector: 'app-shop-order',
  templateUrl: './shop-order.component.html',
  styleUrls: ['./shop-order.component.css'],
})
export class ShopOrderComponent implements OnInit {
  itemList: Array<Item> = new Array<Item>();
  categoryList: Array<Category> = new Array<Category>();
  categoryId: string = '';
  pageNumbers: number[] = [];
  max = 10;
  rate = 7;
  isReadonly = true;
  k = 0;
  ratingArrayList: Array<number> = new Array<number>();
  itemRatingArray: ItemRating[] = [];
  modalRef: BsModalRef = new BsModalRef();

  //===========
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isPasswordsMatch = true; //assume for hiding the validation msg
  valueWidth = false;
  messageModal = '';

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private routerActive: ActivatedRoute,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private modalService: BsModalService
  ) {
    // this.setContentEvent.emit(SITE);
  }

  form: any = {
    name: null,
    contactNo: null,
    type: null,
    table: null,
  };

  path: string | undefined;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {
        console.log(err);
      }
    );

    if (this.categoryList[0].id != null) {
      this.categoryId = this.categoryList[0].id;
      this.getItemsByPage(0, 12, this.categoryId);
    }

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
        this.fillRatingArray();
      });
  }

  nextIndexList(index: any) {
    this.getItemsByPage(index - 1, 12, this.categoryId);
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
        console.log(error.error);
      }
    );
  }

  fillRatingArray() {
    this.itemList.forEach((i) => {
      if (i.rateCount) {
        this.ratingArrayList.push(i.rateCount);
        let itm: ItemRating = new ItemRating();
        itm.item = i;
        itm.index = this.k++;
        this.itemRatingArray.push(itm);
      }
    });
  }

  onClickItemTypeChange(id: string) {
    this.getItemsByPage(0, 12, id);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {}
}
