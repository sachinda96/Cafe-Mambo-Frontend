import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);
  }
}
