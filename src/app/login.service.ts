import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { Customer } from './customer';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  profilePic:any;
  loggedInEmailIdVar!: string;
  loggedIn:Boolean=false;
      url = "http://localhost:9000/api/v2/login"
  constructor(private http: HttpClient, private cartService: CartService) { }


  public loginFromRemote(credential: Customer): Observable<any> {
   //localStorage.setItem("city",credential.address.city);
    console.log("Address****"+ JSON.stringify(credential));
    console.log("loggedIn emailId (service) ...." + credential.customerEmailId);
    this.loggedInEmailIdVar = credential.customerEmailId;
    return this.http.post<any>(`${this.url}`, credential)
  }


  loggedInEmailId() {
    return this.loggedInEmailIdVar;
  }


  public loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }


  public isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null ||localStorage.getItem('email') == null) {
      return false;
    }
    else {
      return true;
    }
  }


  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email')
    //sessionStorage.removeItem('email');
    localStorage.removeItem('city');
    this.loggedInEmailIdVar = "";
    this.cartService.removeAllCart();
    return true;
  }


  
}