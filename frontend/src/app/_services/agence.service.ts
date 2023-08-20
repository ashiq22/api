import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'x-access-token': '${token}' })
};

const AUTH_API = 'https://malabuss.herokuapp.com/agency/';



@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  uri = 'https://malabuss.herokuapp.com/agency';
  constructor(private http: HttpClient) { }
  forgetPassword(email: string): Observable<any> {
    return this.http.post('https://malabuss.herokuapp.com/agency/password/forgetpassword', {
      email
    }, httpOptions);
  }

  resetPassword(username: any, password: any, confirmPassword: any, token: any): Observable<any> {
    const obj = {
      username: username,
      password: password,
      confirmPassword: confirmPassword
    }
    return this.http.put(`${AUTH_API}` + `password/reset/${token}`, {
      username,
      password,
      confirmPassword
    }, httpOptions);
  }

  Addarret(data: any): Observable<any> {
    
    let API_URL = `https://malabuss.herokuapp.com/agency/ajoutArret`;
    return this.http.post(API_URL, data)
    
  }

  Addligne(data: any): Observable<any> {    
    let API_URL = `https://malabuss.herokuapp.com/agency/ajoutLigne`;
    return this.http.post(API_URL, data)
    
  }
  
  AddligneInfo(data: any, id_agence : any): Observable<any> {  
      
    let API_URL = `https://malabuss.herokuapp.com/agency/ajoutInfoLigne/`;
    return this.http.post(API_URL + id_agence ,data   )
    
  }

  getAllligneinfobyid = (id_agence : any) => {
    let API_URL = `https://malabuss.herokuapp.com/agency/findallligneByid/`;
    return this.http.get(API_URL+ id_agence);
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


  getAllligneinfo = () => {
    let API_URL = `https://malabuss.herokuapp.com/agency/listAll-infoLigne`;
    return this.http.get(API_URL, httpOptions);
  }

  getAllligne= () => {
    let API_URL = `https://malabuss.herokuapp.com/agency/listeAll-ligne`;
    return this.http.get<any>(API_URL, httpOptions);
  }
  getAllArret= () => {
    let API_URL = `https://malabuss.herokuapp.com/agency/listeAll-arret`;
    return this.http.get<any>(API_URL, httpOptions);
  }





 


  deleteLigne(id : any){
    return  this.http.delete('https://malabuss.herokuapp.com/agency/deleteInfoligne/'+id)
  }
  updateLigne(id: any , newligne: any){  
   
    return this.http.put('https://malabuss.herokuapp.com/agency/updateInfoligne/' +id , newligne )
  }


  update(id: any, data: any): Observable<any> {
    return this.http.put(`https://malabuss.herokuapp.com/agency/updateInfoligne/${id}`, data);
  }


  addDatenbTickets(data:any   ): Observable<any>{
    let API_URL = `https://malabuss.herokuapp.com/agency/AjouterDateNbticket/`;
    return this.http.post(API_URL ,data)
  }
  getAllDatenbTickets= (id_agence : any) => {
    let API_URL = `https://malabuss.herokuapp.com/agency/infoVoyage/`;
    return this.http.get<any>(API_URL+ id_agence, httpOptions);
  }

  deleteVoyage(id : any) {

    return  this.http.delete('https://malabuss.herokuapp.com/agency/annulerVoyage/'+id)

  }

  getHistoriqueTickets= (nameagency : any) => {
    let API_URL = `https://malabuss.herokuapp.com/agency/historiqueTicket/`;
    return this.http.get<any>(API_URL+ nameagency, httpOptions);
  }

  getStat= (nameagency : any) => {
    let API_URL = `https://malabuss.herokuapp.com/agency/nbticketVenduebyagence/`;
    return this.http.get<any>(API_URL+ nameagency, httpOptions);
  }

  

  
  

  

}

