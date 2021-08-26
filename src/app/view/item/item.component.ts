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
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  // @Output() setContentEvent = new EventEmitter<string>();

  item: Item = new Item();
  itemId: string = '';

  //====slider====
  //max value of slider
  max: number = 5;
  //intial value
  value: number = 3;

  //===modal=====
  modalRef: BsModalRef = new BsModalRef();
  message: string = '';
  itemReviewList: ItemReview[] = [];

  //authentication
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private routerActive: ActivatedRoute,
    private itemService: ItemService,
    private modalService: BsModalService,
    private itemReviewService: ItemReviewService,
    private tokenService: TokenStorageService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    //this.setContentEvent.emit(SITE);
    this.spinner.show();

    this.routerActive.params.subscribe((params) => {
      if (params.itemId != null || params.itemId != undefined) {
        this.itemId = params.itemId;
        this.getItem(this.itemId);
      }
    });

    this.isLoggedIn = this.tokenService.getUserId() != null ? true : false;
    if (this.itemId != null)
      this.itemReviewService.getReviewsByItem(this.itemId).subscribe(
        (data) => {
          this.itemReviewList = data;

          if (this.itemReviewList.length >= 3) {
            let a = [];
            a = [
              this.itemReviewList[0],
              this.itemReviewList[1],
              this.itemReviewList[3],
            ];
            this.itemReviewList = a;
          }

          //console.log(this.itemReviewList);
        },
        (err) => {
          console.log(err);
        }
      );
    this.spinner.hide();
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
