import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: [
    './category-list.component.css',
    '../../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class CategoryListComponent implements OnInit {
  categoryList: Category[] = [];

  constructor(private catService: CategoryService) {}

  ngOnInit(): void {
    this.catService.getAllCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
