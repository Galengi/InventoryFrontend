import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Login } from "../models/login";
import { Response } from "../models/response";
import { Usuario } from "../models/usuario";

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

export class ApiauthService {
    url: string = 'https://localhost:5001/api/User/login';

    private usuarioSubject: BehaviorSubject<Usuario>;
    public usuario = {} as Observable<Usuario>;

    public get usuarioData(): Usuario{
      return this.usuarioSubject.value;
    }

    constructor(private _http: HttpClient){
      this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')!));
      this.usuario = this.usuarioSubject.asObservable();
    }
    login(login: Login): Observable<Response>{
        return this._http.post<Response>(this.url, login, httpOption).pipe(
          map(res => {
            if(res.success == 1) {
              const usuario: Usuario = res.data;
              localStorage.setItem('usuario', JSON.stringify(usuario));
              this.usuarioSubject.next(usuario);
            }
            return res;
          })
        );
    }

    logout(){
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null!);
    }
}
