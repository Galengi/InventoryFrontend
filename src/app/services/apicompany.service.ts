import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
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
export class ApiCompanyService {

  url: string = 'https://localhost:5001/api/Company';
  //getUrl:string = 'api/Company/message';
  //postUrl:string = 'api/chat/add';
  //private baseUrlProve: string = "https://localhost:44377/";
  constructor(
    private _http: HttpClient
  ) { }

  getCompanies(): Observable<Response> {
      return this._http.get<Response>(this.url);
  }
  
  getCompany(id:number): Observable<Response> {
      return this._http.get<Response>(`${this.url}/${id}`);
  }
  

  add(company: Company): Observable<Response>{
    return this._http.post<Response>(this.url, company, httpOption);
  }

  edit(id:number,company: Company): Observable<Response>{
    return this._http.put<Response>(`${this.url}/${company.id}`, company, httpOption);
  }
  
  delete(id: number): Observable<Response>{
    return this._http.delete<Response>(`${this.url}/${id}`);
  }
}