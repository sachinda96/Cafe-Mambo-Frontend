import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SITE } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  @Output() setContentEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.setContentEvent.emit(SITE);
  }
}
