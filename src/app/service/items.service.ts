import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../items';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<
      {
        id: number;
        name: string;
        type: string;
        price: number;
        description: string;
      }[]
    >('');
    //return this.items;
  }

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
}
