import { Component, OnInit } from '@angular/core';
import { items, Item } from '../../items';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  constructor(private http: HttpClient, private cartService: CartService) {}
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
    // alert(item.name + ' added');
    this.cartService.addToCart(item);
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  getItems(type: string) {}
}
