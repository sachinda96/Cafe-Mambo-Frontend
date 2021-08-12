import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/environments/environment';
import { Category } from '../model/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(protected http: HttpClient) {}

  ngOnInit(): void {}

  getAllCategories() {
    return this.http.get<Category[]>(
      BASE_URL + '/category/getAllCategories',
      httpOptions
    );
  }
  getCategoryById(id: string) {
    return this.http.get<Category>(
      BASE_URL + '/category/getCategoryById/' + id,
      httpOptions
    );
  }
  addCategory(category: Category) {
    return this.http.post(BASE_URL + '/category', category, httpOptions);
  }
  updateCategory(category: Category) {
    return this.http.post(BASE_URL + '/category/update', category, httpOptions);
  }
  deleteCategoryById(id: string) {
    return this.http.post(BASE_URL + '/category/removeCategory/' + id, {});
  }
}
