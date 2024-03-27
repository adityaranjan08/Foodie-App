import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  tokenStr = 'Bearer ' + localStorage.getItem("token");
  headers = new HttpHeaders().set("Authorization", this.tokenStr);
  constructor(private http: HttpClient) {}

  addRestaurant(restaurant: any, email: string | null) {
    return this.http.post("http://localhost:9000/api/v1/admin/" + email + "/restaurant", restaurant, { headers: this.headers })
  }

  getRestaurants() {
    return this.http.get("http://localhost:9000/api/v1/restaurants")
  }

}
