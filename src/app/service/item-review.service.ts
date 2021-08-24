import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { ItemReview } from '../model/item-review';

@Injectable({
  providedIn: 'root',
})
export class ItemReviewService {
  constructor(private http: HttpClient) {}

  getAllReviewsByUser(uid: string | null) {
    return this.http.get<ItemReview[]>(BASE_URL + '/itemReview/' + uid);
  }
  getReviewById(id: string) {
    return this.http.get<ItemReview>(BASE_URL + '/itemReview/' + id);
  }
  addReview(review: any) {
    return this.http.post(BASE_URL + '/item', review);
  }
  deleteReview(id: string) {
    return this.http.post(BASE_URL + '/review', id);
  }
}
