import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { Response } from '../models/response'; 
import { ShoppingList } from '../models/shopping-list';

const httpOption = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json'
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class ApiShopService {

  url: string = 'https://localhost:5001/api/shop';
  //getUrl:string = 'api/tag/message';
  //postUrl:string = 'api/chat/add';
  //private baseUrlProve: string = "https://localhost:44377/";
  constructor(
    private _http: HttpClient
  ) { }

  getProducts(): Observable<Response> {
      return this._http.get<Response>(this.url);
  }

  add(id:number, shop: ShoppingList): Observable<Response>{
    return this._http.post<Response>(`${this.url}/${id}`, shop, httpOption);
  }

  addList(shops: ShoppingList[]): Observable<Response>{
    return this._http.post<Response>(`${this.url}`, shops, httpOption);
  }

  edit(id:number, shop: ShoppingList): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${id}`, shop, httpOption);
  }

  editList(shops: ShoppingList[]): Observable<Response>{
    return this._http.put<Response>(`${this.url}`, shops, httpOption);
  }
  
  deleteShopList(): Observable<Response>{
    return this._http.delete<Response>(`${this.url}`);
  }

  delete(id:number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}