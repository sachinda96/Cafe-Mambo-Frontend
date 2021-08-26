import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { SITE } from 'src/environments/environment';
import { Item } from '../../model/item';
import { ItemService } from '../../service/item.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ItemReviewService } from 'src/app/service/item-review.service';
import { ItemReview } from 'src/app/model/item-review';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();
  //slider
  item: Item = new Item();
  itemId: string = '';
  max: number = 5;
  value: number = 3;

  //modal
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  itemReviewList: ItemReview[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private routerActive: ActivatedRoute,
    private itemService: ItemService,
    private modalService: BsModalService,
    private itemReviewService: ItemReviewService
  ) {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);

    this.routerActive.params.subscribe((params) => {
      if (params.itemId != null || params.itemId != undefined) {
        this.itemId = params.itemId;
        this.getItem(this.itemId);
        console.log(this.itemId);
      }
    });

    if (this.itemId != null)
      this.itemReviewService.getReviewsByItem(this.itemId).subscribe(
        (data) => {
          this.itemReviewList = data;
          let a = [];
          a = [
            this.itemReviewList[0],
            this.itemReviewList[1],
            this.itemReviewList[3],
          ];
          this.itemReviewList = a;
        },
        (err) => {
          console.log(err);
        }
      );
    console.log(this.itemId);
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item);
  }

  getItem(itemId: string) {
    this.itemService.getItem(itemId).subscribe(
      (res) => {
        this.item = res;
        console.log(res);
        this.value = res.rateCount != undefined ? res.rateCount : 3;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
