import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Voyageur } from '../model/voyageur';
import { Agence } from '../model/agence';
import { catchError, map } from 'rxjs/operators';
const URLC = 'http://10.0.80.235:3000/user/';
const URL = 'http://10.0.80.235:3000/admin/';
const URLF = 'http://10.0.80.235:3000/forum/';
const AUTH_API = 'http://10.0.80.235:3000/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'x-access-token': '${TOKEN_KEY}' })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any
  user: any
  agency: any



  baseUri: string = 'http://10.0.80.235:3000/user';
  baseUriAgence: string = 'http://10.0.80.235:3000/agency';

  constructor(private httpClient: HttpClient) { }



  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'password/forgetpassword', {
      email
    }, httpOptions);
  }
  resetPassword(username: any, password: any, confirmPassword: any, token: any): Observable<any> {
    const obj = {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }


    return this.httpClient.put(`${AUTH_API}` + `password/reset/${token}`, {
      username,
      password,
      confirmPassword
    }, httpOptions);

  }


  confirmUser(confirmationCode: any) {
    return this.httpClient.get<any>('http://10.0.80.235:3000/user/confirm/' + confirmationCode);
  }


  createUser(data: Voyageur): Observable<any> {
    let API_URL = `${this.baseUri}/register`;
    return this.httpClient.post(API_URL, data)
  }

  findUserByEmail(email: any): Observable<any> {

    let API_URL = `${this.baseUri}/findUserByEmail`;
    return this.httpClient.get(API_URL + "/" + email)
      .pipe(
        catchError(this.handleError)
      )
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  updateuser(id: any, newuser: any) {
    this.token = sessionStorage.getItem('auth-user')
    this.user = JSON.parse(this.token)
    let Options = {
      headers: new HttpHeaders({ 'x-access-token': this.user.token })
    }
    return this.httpClient.put('http://10.0.80.235:3000/user/updateProfil/' + id, newuser, Options)
  }
  createAgence(data: Agence) {
    let API_URL = `${this.baseUriAgence}/register`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )

  }
  updateAgence(id: any, newagence: any) {
    this.token = sessionStorage.getItem('auth-user')
    this.agency = JSON.parse(this.token)
    let Options = {
      headers: new HttpHeaders({ 'x-access-token': this.agency.token })
    }
    return this.httpClient.put('https://malabuss.herokuapp.com/agency/updateProfil/' + id, newagence, Options)
  }



  getForum = () => {
    return this.httpClient.get('http://10.0.80.235:3000/forum/listeForums');
  }

  getArret = () => {
    return this.httpClient.get('http://10.0.80.235:3000/agency/listeAll-arret');
  }
  getTicket(data: any): Observable<any> {
    let API_URL = `${this.baseUri}/recherche_voyage`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  createContact(data: any) {
    let API_URL = `${this.baseUri}/Contacter`;
    return this.httpClient.post(API_URL, data)
      

  }



  addTeservayion(data: any) {
    let API_URL = `${this.baseUri}/ajout_reservation`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  rapportVenteAgence(data: any): Observable<any> {
    let API_URL = `${this.baseUri}/test`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  getReservation = () => {
    return this.httpClient.get(URL + 'findreservation', httpOptions);
  }

  addForum(data: any): Observable<any> {
    let API_URL = `http://10.0.80.235:3000/forum/ajouterFourum/`;
    return this.httpClient.post(API_URL, data)
  }



}





