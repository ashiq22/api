import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const AUTH_API = 'http://10.0.80.235:3000/user/';
const AUTH_API_Agence = 'http://10.0.80.235:3000/agency/';

let httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })

};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(credentels: string, password: string){
    return this.http.post<any>(AUTH_API + 'login' , {
      credentels,
      password
  }) ;
  }
  loginAgence(credentels: string, password: string): Observable<any> {
    return this.http.post(AUTH_API_Agence + 'login' , {
      credentels,
      password
  } , httpOptions) ;

  }
}
