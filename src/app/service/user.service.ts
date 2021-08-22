import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(BASE_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'user' + { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'admin', { responseType: 'text' });
  }

  getUserById(uid: string) {
    return this.http.get<User>(BASE_URL + '/getUser/' + uid);
  }
}
