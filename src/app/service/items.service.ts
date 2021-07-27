import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/items';

// @Injectable({})
const itemsURL = '';
export class ItemsService {
  items: Item[] = [];

  constructor(private http: HttpClient) {}

  getItems(type: string) {
    return this.http.get<
      {
        id: number;
        name: string;
        type: string;
        subType: string;
        price: number;
        description: string;
        imageUrl: string;
      }[]
    >(itemsURL + '?type=' + type);
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
/*

{
       id: 1,
        name: "tequila Mojito",
        type: drink,
        price: 300,
        description: "tequila, mint, lime juice, club soda, water, sugar, fresh min leaves"

},
{
       id: 2,
        name: "tequila Sunrise",
        type: drink,
        price: 300,
        description: "tequila,orange juice, ice cubes, fluid ounce grenadine syrup, orange, maraschino          cherry "

},
{
       id: 3,
        name: Classic Magarita",
        type: drink,
        price: 300,
        description: "tequila, cointreau, fresh lime juice, magarita salt"
},









*/
