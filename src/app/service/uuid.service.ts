import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root',
})
export class UuidService {
  uuidValue: string = '';
  constructor() {}

  generateUUID() {
    return UUID.UUID();
  }
}
