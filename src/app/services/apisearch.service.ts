import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response'; 

@Injectable({
  providedIn: 'root'
})
export class ApiSearchService {

  url: string = 'https://localhost:5001/api/Search';
  constructor(
    private _http: HttpClient
  ) { }
  
  getSearch(name:string): Observable<Response> {
      return this._http.get<Response>(`${this.url}/${name}`);
  }
}
