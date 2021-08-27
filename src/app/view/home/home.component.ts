import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Item } from 'src/app/model/item';
import { CategoryService } from 'src/app/service/category.service';
import { ItemService } from 'src/app/service/item.service';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();
  categoryList: Category[] = [];
  itemList: Item[] = [];
  i = 0;
  catId: string | undefined = '';
  constructor(
    private categoryService: CategoryService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);

    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (err) => {
        console.log(err);
      }
    );

    this.itemService.getAllItems().subscribe(
      (data) => {
        data.forEach((d) => {
          if (this.i < 4) {
            let des = d.description?.slice(0, 80) + '........';
            d.description = des;
            this.itemList.push(d);
            if (this.i == 0) this.catId = d.categoryId;
            this.i++;
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  findCategoryNameById(id: string | undefined) {
    if (id) return this.categoryList.find((c) => c.id == id);
    return '';
  }

  trimDescription() {
    this.itemList.forEach((i) => {
      let des = i.description?.slice(0, 30) + '........';
      i.description = des;
    });
  }
}
