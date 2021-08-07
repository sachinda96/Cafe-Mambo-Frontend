import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReviewDetailsComponent } from './item-review-details.component';

describe('ItemReviewDetailsComponent', () => {
  let component: ItemReviewDetailsComponent;
  let fixture: ComponentFixture<ItemReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
