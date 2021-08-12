import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListTableComponent } from './item-list-table.component';

describe('ItemListTableComponent', () => {
  let component: ItemListTableComponent;
  let fixture: ComponentFixture<ItemListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
