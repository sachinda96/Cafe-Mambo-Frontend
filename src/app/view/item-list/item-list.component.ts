import { Component, OnInit } from '@angular/core';
import {
  items,
  mocktailItems,
  cocktailItems,
  appetizerItems,
} from '../../model/items';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';
import { BASE_URL } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {ItemService} from "../../service/item.service";
import {Item} from "../../model/item";
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {

  itemList:Array<Item> = new Array<Item>();
  categoryId:string = "";
  pageNumbers:Array<number> = new Array<number>();

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private location: Location,
    private routerActive: ActivatedRoute,
    private itemService:ItemService
  ) {}

  items = items;
  path: string | undefined;


  ngOnInit(): void {

    this.routerActive.params.subscribe(params =>{
      if(params.id != null || params.id != undefined){
        this.categoryId = params.id;
        this.getItemByPage(0,8,params.id);
      }
    });

    this.countByCategory(this.categoryId);

  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

   getItemByPage(index:any,size:any,id: any) {
    this.itemService.getAllByPageIndexAndSize(index,size,id).subscribe(
      res=>{
        console.log(res)
        this.itemList = res;
      }
    );
  }

  nextIndexList(index:any) {
    this.getItemByPage(index-1,8,this.categoryId);
  }

  private countByCategory(categoryId: string) {
    this.itemService.countByCategory(categoryId).subscribe(
      res=>{
        let count = 0 ;
        for (let i = 0; i < res; i++) {
          count = count+ 1;
          this.pageNumbers.push(count);
        }


      },error => {
        error.error;
      }
    )
  }
}
