import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);
  }
}
