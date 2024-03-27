import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http : HttpClient) { }
  public registrationFromRemote(customer:any):Observable<any>{
    const httpHeader = new HttpHeaders({"Content-Type":"application/json"})
    const requestOptions = {headers: httpHeader}
    return this.http.post<any>("http://localhost:9000/api/v3/registerCustomer",customer,{})
  }
}