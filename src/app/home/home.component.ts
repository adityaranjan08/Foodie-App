import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CustomerService } from '../customer.service';
import { RestaurantComplete, Restaurant } from '../Restaurants';
import { MatDialog } from '@angular/material/dialog';
import { CuisinesComponent } from '../cuisines/cuisines.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalLength:any;
  page:number=1;

  restaurants: RestaurantComplete[];
  constructor(private adminService: AdminService, private route: Router, private customerService: CustomerService,private dialog: MatDialog) 
  { }

  ngOnInit(): void {

    // this.totalLength=result.length;
    if(this.customerService.restaurants != null){
      console.log("inside if");
      
    this.restaurants = this.customerService.restaurants
    console.log("after .."+this.restaurants)
    }
    else {
      console.log("Inside else");
      this.adminService.getRestaurants().subscribe (
      (data: any) =>{
        this.totalLength=data.length;
        this.restaurants = data},
       );
   }
  }
  showCuisines(items : any){
     let cuisineRef=this.dialog.open(CuisinesComponent, {data:{items}});
     cuisineRef.afterClosed().subscribe(result=>{
       console.log("cuisine box result"+result);  
      }
     )
  }
  }


