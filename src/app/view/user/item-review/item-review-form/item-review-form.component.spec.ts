import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemReviewFormComponent } from './item-review-form.component';

describe('ItemReviewFormComponent', () => {
  let component: ItemReviewFormComponent;
  let fixture: ComponentFixture<ItemReviewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemReviewFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
