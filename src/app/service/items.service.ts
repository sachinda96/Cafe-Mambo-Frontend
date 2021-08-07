import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, ItemDto } from '../model/items';
import { BASE_URL } from 'src/environments/environment';

// @Injectable({})
const size: number = 9;
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get<ItemDto[]>(BASE_URL + '/getAll');
  }

  getAllItemsByCategory(categoryId: string) {
    return this.http.get<ItemDto[]>(
      BASE_URL + '/getAllItemByCategory/' + categoryId
    );
    //return this.items;
  }

  getAllItemsByIndexAndCategory(index: string, categoryId: string) {
    return this.http.get<ItemDto>(
      BASE_URL +
        '/getAllItemByIndexAndCategory/' +
        index +
        '/' +
        size +
        '/' +
        categoryId
    );
  }

  getAllItemsByIndex(index: string) {
    return this.http.get<ItemDto>(
      BASE_URL + '/getAllItemByIndex/' + index + '/' + size
    );
  }

  getItemById(id: string) {
    return this.http.get<Item>(BASE_URL + '/getItem/' + id);
  }

  addItem(values: any) {
    // return this.http.post(BASE_URL + '/getItem/' + id);
  }
  updateitemByItem(file: any, item: ItemDto) {}
  deleteItemById(id: string) {}
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
