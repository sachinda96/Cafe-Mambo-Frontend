import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/model/item';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-item-list-table',
  templateUrl: './item-list-table.component.html',
  styleUrls: [
    './item-list-table.component.css',
    '../../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class ItemListTableComponent implements OnInit {
  itemList: Item[] = [];
  categoryList: Category[] = [];

  constructor(
    private itemService: ItemService,
    private catService: CategoryService
  ) {}

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(
      (data) => {
        console.log(data);
        this.itemList = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.catService.getAllCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCategoryName(id: any) {
    return this.getCategory(id)?.name;
  }

  getCategory(id: string) {
    return this.categoryList.find((c) => c.id.localeCompare(id) == 0);
  }
}
