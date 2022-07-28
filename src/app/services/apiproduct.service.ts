import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { timeout, catchError, delay } from 'rxjs/operators';
import { Product, ProductModel } from '../models/product';
import { Response } from '../models/response'; 

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
export class ApiProductService {

  exampleEdit = {
    "name": "farfalla vendeta",
    "currentAmount": 2,
    "minAmount": 1,
    "image": "perarares                                                                                                              ",
    "required": 1,
    "productAmount": 6,
    "typeAmount": 2,
    "productCompanies": [
        {
            "id":2,
            "price":5.1
        },
        {
            "id":4,
            "price":9.9
        }
    ],
    "productTags": [
        {
            "id":1
        }
    ]
}

  url: string = 'https://localhost:5001/api/product';
  constructor(
    private _http: HttpClient
  ) { }

  getProducts(): Observable<Response> {
      return this._http.get<Response>(this.url);
  }

  getProduct(id: number): Observable<Response> {
      return this._http.get<Response>(`${this.url}/${id}`);
  }

  add(product: ProductModel): Observable<Response>{
    return this._http.post<Response>(this.url, product, httpOption);
  }

  edit(id: number,product: ProductModel): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${product.id}`, product, httpOption).pipe(delay(100));
  }
  

  
  delete(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}