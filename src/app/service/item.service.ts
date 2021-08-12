import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/items';
import { BASE_URL } from 'src/environments/environment';

// @Injectable({})
const size: number = 9;
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  getAllItems() {
    return this.http.get<Item[]>(BASE_URL + '/item/getAll');
  }

  getAllItemsByCategory(categoryId: string) {
    return this.http.get<Item[]>(
      BASE_URL + '/item/getAllItemByCategory/' + categoryId
    );
    //return this.items;
  }

  getAllItemsByIndexAndCategory(index: string, categoryId: string) {
    return this.http.get<Item>(
      BASE_URL +
        '/item/getAllItemByIndexAndCategory/' +
        index +
        '/' +
        size +
        '/' +
        categoryId
    );
  }

  getAllItemsByIndex(index: string) {
    return this.http.get<Item>(
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
