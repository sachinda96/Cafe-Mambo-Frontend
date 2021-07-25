import { Component, OnInit } from '@angular/core';
import { items, Item } from '../../items';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  constructor(private http: HttpClient) {}
  items = items;
  v: any;
  page = 1;

  json = {
    totalItems: 12,
    items: items,
    totalPages: 3,
    currentPage: 1,
  };

  ngOnInit(): void {
    this.v = this.http.get<{
      id: number;
      name: string;
      type: string;
      subType: string;
      price: number;
      description: string;
      imageUrl: string;
    }>('');
  }

  addToCart(item: Item) {
    alert(item.name + ' added');
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  getItems(type: string) {}
}
