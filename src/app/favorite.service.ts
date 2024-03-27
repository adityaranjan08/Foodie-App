import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  tokenStr='Bearer '+localStorage.getItem("token");
  headers=new HttpHeaders().set("Authorization",this.tokenStr);
  constructor(private http: HttpClient) { }

  getFavorite(email:string|null) {
    return this.http.get("http://localhost:9000/api/v4/favorite/"+email, {headers: this.headers})
  }


  deleteFav(cuisineName:string, restaurantId:string ){
    return this.http.delete("http://localhost:9000/api/v4/"+localStorage.getItem('email')+"/"+restaurantId+"/"+cuisineName ,{headers: this.headers})
  }
}
