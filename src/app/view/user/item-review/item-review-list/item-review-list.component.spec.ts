import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReviewListComponent } from './item-review-list.component';

describe('ItemReviewListComponent', () => {
  let component: ItemReviewListComponent;
  let fixture: ComponentFixture<ItemReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
