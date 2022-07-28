import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../models/message";

const httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization':'my-auth-token'
      }
    )
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    public algo: string = "hola pirinola";
    getUrl:string = 'api/chat/message';
    postUrl:string = 'api/chat/add';
    private baseUrlProve: string = "https://localhost:44377/";

    constructor(private _http: HttpClient){
    }


    public GetMessage(): Observable<Message[]> {
        return this._http.get<Message[]>(this.baseUrlProve + this.getUrl);
    }

    public Add(name:string,text:string)
    {
        this._http.post<Response>(this.baseUrlProve+this.postUrl,{'Name':name, 'Text':text},httpOptions).
        subscribe(result => {
            console.log(result);
        },
        error=> console.error(error)
        );
    }
}

