import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RestaurantComplete } from './Restaurants';

@Injectable({
  providedIn: 'root'
})
export class CustomerService 
{
  tokenStr='Bearer '+localStorage.getItem("token");
  headers=new HttpHeaders().set("Authorization",this.tokenStr);
  restaurants: RestaurantComplete[] | null;
  city:string;
  constructor(private http: HttpClient, private route: Router) 
  { }
  addFavorite(restaurant:any, email:string|null)
  {   
    console.log(restaurant);
    
      return this.http.post("http://localhost:9000/api/v4/"+email+"/cuisine",restaurant,{headers: this.headers})
  }

  public getCustomerDetails()
  {    
      console.log("local email***"+localStorage.getItem('email'))
      return this.http.get("http://localhost:9000/api/v3/"+localStorage.getItem('email')+"/city")
  }

 
}
