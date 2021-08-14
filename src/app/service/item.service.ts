import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/items';
import { BASE_URL, ITEMS_PER_PAGE_COUNT } from 'src/environments/environment';
import { delay } from 'rxjs/operators';

// @Injectable({})
const size: number = ITEMS_PER_PAGE_COUNT;
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items: Item[] = [];
  itemCategorySelected = '';

  constructor(private http: HttpClient) {}

  setItemCategorySelected(categoryid: string): void {
    this.itemCategorySelected = categoryid;
  }
  getAllItems() {
    return this.http.get<Item[]>(BASE_URL + '/item/getAll');
  }

  getAllItemsByCategory(categoryId: string) {
    return this.http.get<Item[]>(
      BASE_URL + '/item/getAllItemByCategory/' + categoryId
    );
    //return this.items;
  }

  getAllItemsByIndexAndCategory(index: number, categoryId: string | null) {
    return this.http
      .get<Item[]>(
        BASE_URL +
          '/item/getAllItemByIndexAndCategory/' +
          index +
          '/' +
          size +
          '/' +
          categoryId
      )
      .pipe(delay(1000));
  }

  getAllItemsByIndex(index: number) {
    return this.http.get<Item[]>(
      BASE_URL + '/item/getAllItemByIndex/' + index + '/' + size
    );
  }

  getItemById(id: string) {
    return this.http.get<Item>(BASE_URL + '/item/getItem/' + id);
  }

  addItem(values: any, item: Item) {
    return this.http.post(BASE_URL + '/item', item);
  }

  addImage(image: File) {
    return this.http.post('/item/', image);
  }

  updateItemById(image: any, item: Item) {
    return this.http.post(BASE_URL + '/item/update', {}, image);
  }

  updateImageById(image: any, id: string) {
    return this.http.put('/item/', image);
  }

  deleteItemById(id: string) {
    return this.http.post(BASE_URL + '/item/removeItem/' + id, {});
  }
}

/*
  getItem(id: number) {
    return this.findItem(id);
  }

  findItem(id: number) {
    var item: Item;
    var itemArray: Item[];

    itemArray = this.items.filter((i) => i.id === id);
    item = itemArray[0];
    return item;
  }
  */
