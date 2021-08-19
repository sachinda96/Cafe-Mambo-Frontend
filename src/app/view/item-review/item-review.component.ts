import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ItemReviewService } from 'src/app/service/item-review.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: ['./item-review.component.css'],
})
export class ItemReviewComponent implements OnInit {
  value: number = 3;
  options: Options = {
    floor: 0,
    ceil: 5,
    step: 0.1,
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      if (value <= 3) {
        return 'red';
      }
      if (value <= 6) {
        return 'orange';
      }
      if (value <= 9) {
        return 'yellow';
      }
      return '#2AE02A';
    },
  };
  isLoggedIn = false;

  form: any = {
    id: null,
    review: null,
    rate: null,
    userId: null,
    itemId: null,
  };
  constructor(
    private itemReviewService: ItemReviewService,
    private routerActive: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.routerActive.params.subscribe((params) => {
      if (params.itemId != null || params.itemId != undefined) {
        this.form.itemId = params.itemId;
      }
    });

    this.isLoggedIn = this.tokenService.getToken() != null ? true : false;
  }

  addReview() {
    console.log(this.form);
    this.form.rate = this.value;
    this.form.userId = this.tokenService.getUserId();
    //   this.itemReviewService.addReview(this.form);
  }
}
