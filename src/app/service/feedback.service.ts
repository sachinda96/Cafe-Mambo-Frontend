import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from '../model/feedback';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAllFeedbacks() {
    return this.http.get<Array<Feedback>>(BASE_URL + '/feedback/');
  }

  getAllFeedbacksByUser(uid: string) {
    return this.http.get<Array<Feedback>>(
      BASE_URL + '/feedback/getFeedback/' + uid
    );
  }
  getFeedbackById(id: string) {
    return this.http.get<Feedback>(BASE_URL + '/feedback/getFeedback/' + id);
  }
  addFeedback(fdback: Feedback) {
    return this.http.post(BASE_URL + '/feedback', fdback);
  }
  updateFeedback(fdback: Feedback) {
    return this.http.post(BASE_URL + '/feedback', fdback);
  }
}
