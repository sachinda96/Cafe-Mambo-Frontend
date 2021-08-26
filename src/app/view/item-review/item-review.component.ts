import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ItemReviewService } from 'src/app/service/item-review.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: ['./item-review.component.css'],
})
export class ItemReviewComponent implements OnInit {
  // @Output() setContentEvent = new EventEmitter<string>();

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
  errorMessage = '';
  isError = false;

  form: any = {
    id: null,
    review: null,
    rate: null,
    userId: null,
    itemId: null,
    userName: null,
    level: null,
  };
  constructor(
    private itemReviewService: ItemReviewService,
    private routerActive: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    // this.setContentEvent.emit(SITE);
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
    this.itemReviewService.addReview(this.form).subscribe(
      (data) => {
        console.log(data);
        window.location.reload();
      },
      (err) => {
        this.errorMessage = err.error;
        console.log(err.error);
        this.isError = true;
      }
    );
  }
}
