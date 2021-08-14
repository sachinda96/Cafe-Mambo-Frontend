import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Item} from "../model/item";


@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http:HttpClient,private authService:AuthService) { }

  countByCategory(categoryId:string): Observable<any>{
    return this.http.get(
      BASE_URL + '/item/itemCountByCategory/'+categoryId
    )
  }

  getAllByPageIndexAndSize(index: number, size:number,categoryId:String):Observable<Array<Item>>{
    return this.http.get<Array<Item>>(
      BASE_URL + '/item/getAllItemsByIndexAndCategory/'+index+'/'+size+'/'+categoryId
    )
  }

  getItem(id:String):Observable<Item>{
    return this.http.get<Item>(
      BASE_URL + '/item/getItem/'+id
    )
  }
}
