import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'; 
import { TypeUnit } from '../models/type-unit';

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
export class ApiTypeUnitService {

  url: string = 'https://localhost:5001/api/type';
  //getUrl:string = 'api/tag/message';
  //postUrl:string = 'api/chat/add';
  //private baseUrlProve: string = "https://localhost:44377/";
  constructor(
    private _http: HttpClient
  ) { }

  getTypeUnits(): Observable<Response> {
      return this._http.get<Response>(this.url);
  }
  getTypeUnit(id:number): Observable<Response> {
      return this._http.get<Response>(`${this.url}/${id}`);
  }

  add(type: TypeUnit): Observable<Response>{
    return this._http.post<Response>(this.url, type, httpOption);
  }

  edit(id:number,type: TypeUnit): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${type.id}`, type, httpOption);
  }
  
  delete(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
}