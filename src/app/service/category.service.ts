import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategory(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(
      BASE_URL + '/category/getall'
    );
  }
}
