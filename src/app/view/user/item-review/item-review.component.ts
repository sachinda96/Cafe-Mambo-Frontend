import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';
import { ItemReview } from 'src/app/model/item-review';
import { ItemReviewService } from 'src/app/service/item-review.service';
import { ItemService } from 'src/app/service/item.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-cust-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: [
    './item-review.component.css',
    '../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class ItemReviewComponent implements OnInit {
  userId: string | null = '';
  itemReviewList: ItemReview[] = [];
  itemList: Array<Item> = new Array<Item>();

  constructor(
    private tokenService: TokenStorageService,
    private itemReviewService: ItemReviewService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
    this.itemReviewService.getAllReviewsByUser(this.userId).subscribe(
      (data) => {
        this.itemReviewList = data;
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );

    this.itemReviewList.forEach((i) => {
      this.itemService.getItemById(i.itemId).subscribe(
        (data) => {
          this.itemList.push(data);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  getImagePathById(id: string) {
    let item = this.itemList.find((i) => i.id == id);
    return item != null ? item.imagePath : '';
  }
}
