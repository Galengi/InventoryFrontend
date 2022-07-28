import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
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
export class ApiTagService {

  url: string = 'https://localhost:5001/api/tag';
  //getUrl:string = 'api/tag/message';
  //postUrl:string = 'api/chat/add';
  //private baseUrlProve: string = "https://localhost:44377/";
  constructor(
    private _http: HttpClient
  ) { }

  getTags(): Observable<Response> {
      return this._http.get<Response>(this.url);
  }
  getTag(id:number): Observable<Response> {
      return this._http.get<Response>(`${this.url}/${id}`);
  }

  add(tag: Tag): Observable<Response>{
    return this._http.post<Response>(this.url, tag, httpOption);
  }

  edit(id:number,tag: Tag): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${tag.id}`, tag, httpOption);
  }
  
  delete(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }

}