import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-review',
  templateUrl: './item-review.component.html',
  styleUrls: ['./item-review.component.css'],
})
export class ItemReviewComponent implements OnInit {
  starRating = 0;
  constructor() {}

  ngOnInit(): void {}
}
