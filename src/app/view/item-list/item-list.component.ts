import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { items, Item } from '../../model/items';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/service/item.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemListComponent implements OnInit {
  itemList: Array<Item> = new Array();
  categoryList: Category[] = [];
  catId: any;
  catName: any;

  v: any;
  page = 1;

  json = {
    totalItems: 12,
    items: items,
    totalPages: 3,
    currentPage: 1,
  };

  constructor(
    private cartService: CartService,
    private location: Location,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private catService: CategoryService
  ) {
    this.catId = '1';
  }

  ngOnInit(): void {
    //  console.log(this.route.parent?.snapshot?.paramMap);
    this.route.paramMap.subscribe((params) => {
      console.log('id' + params.get('id'));
      this.catName = params.get('id') != null ? params.get('id') : 'mocktails';
    });

    // this.itemService.getAllItemsByIndexAndCategory(1, this.catId).subscribe(
    //   (data) => {
    //     this.itemList = data;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    this.getItemsByCategory(this.catId);
    console.log(this.itemList);

    this.itemList.push({
      id: '4',
      name: 'Sweet Adeline',
      price: 300,
      description:
        'orange-spice black tea blend into a hot mix of pomegranate juice and cinnamon syrup.',
      imagePath:
        'https://www.thespruceeats.com/thmb/tH26KI6ByF0tB0df1pBAb4r82Do=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SweetAdeline-184832349-56a173485f9b58b7d0bf638a.jpg',
      categoryId: '1',
      ingredients: 'black tea',
      rateCount: 2,
    });
  }

  addToCart(item: Item) {
    // alert(item.name + ' added');
    this.cartService.addToCart(item);
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  getItemsByCategory(categoryId: string) {
    this.itemService
      .getAllItemsByCategory(categoryId)
      .pipe(delay(500))
      .subscribe(
        (data) => {
          this.itemList = data;
          console.log(data);
          console.log('=====>');
          console.log(this.itemList);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onClickItemTypeChange(category: string) {
    this.location.replaceState('/shop/' + category);
    //this.enableItemType(type);
  }

  getAllItemsByIndexAndCategory(index: number, categoryId: string) {
    this.itemService.getAllItemsByIndexAndCategory(index, categoryId).subscribe(
      (data) => {
        this.itemList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

/*


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








*/
