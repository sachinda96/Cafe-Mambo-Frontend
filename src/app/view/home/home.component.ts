import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);
  }
}
