import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { LoginService } from '../login.service';
import { Restaurant } from '../Restaurants';
import  restaurantsData from '../restaurants.json';
import { Router } from '@angular/router';
import { CuisinesComponent } from '../cuisines/cuisines.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  // template: `<div>{{jsonDataResult | json}}`

})
//const restaurants:any= require("../restaurants.json");

export class AdminDashboardComponent implements OnInit {
  jsonDataResult: any;
  restaurants:Restaurant[];

  totalLength:any;
  page:number=1;
  
  constructor(private adminService:AdminService ,private loginService:LoginService,private route: Router,private dialog: MatDialog){}

  ngOnInit(): void { 
    console.log(restaurantsData);
    this.adminService.getRestaurants().subscribe(
      (d: any) => this.restaurants = d
    )
     
  }
  
  onAdd(restaurants:any)
  {
      this.adminService.addRestaurant(restaurants,localStorage.getItem("email")).subscribe(
        (response:any) =>
        {
          console.log(response)
          window.alert("Restaurant Has been added to Application")
        }
      )
  }
  showCuisines(items : any){
    let cuisineRef=this.dialog.open(CuisinesComponent, {data:{items}});
    cuisineRef.afterClosed().subscribe(result=>{
      console.log("cuisine box result"+result);  
     }
    )
 }
}
