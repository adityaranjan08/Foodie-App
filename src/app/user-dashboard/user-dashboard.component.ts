import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CuisinesComponent } from '../cuisines/cuisines.component';
import { CustomerService } from '../customer.service';
import { LoginService } from '../login.service';
import { RestaurantComplete, Restaurant } from '../Restaurants';
import { SearchService } from '../search.service';
import {NgToastService} from "ng-angular-popup"

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit 
{
  totalLength:any;
  page:number=1;
  city: string;
  constructor(private logInService:LoginService,private sanitizer: DomSanitizer, private adminService:AdminService,
    private customerService: CustomerService,
     private route: Router,private dialog: MatDialog,
      private searchService:SearchService,  private toast: NgToastService) 
     { 
      
    }
  imageBase64String:any;
  restaurants:any;
  imageUrl:any;
  ngOnInit(): void 
  {
    this.imageBase64String= this.logInService.profilePic
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.imageBase64String);
    console.log("userDAsh***"+this.imageUrl);
    console.log("userDAsh***"+this.imageBase64String);
    console.log("rests "+this.customerService.restaurants);
    console.log("profic p****"+this.logInService.profilePic);
    
    console.log("in ng on it of user")
    if(this.customerService.restaurants != null){
      console.log("inside if");
    this.restaurants = this.customerService.restaurants

    }
    else {

      console.log("Inside else");
      console.log("city"+localStorage.getItem('city'))

      this.customerService.getCustomerDetails().subscribe(
        (response:any)=>{
        console.log("response of get city"+ response.customerAddress.city);
        localStorage.setItem('city',response.customerAddress.city);
        
        this.searchService.searchByCity(localStorage.getItem('city')).subscribe (
          (data:any) =>{
            console.log("city wise****"+data)
            this.restaurants = data;
           
          
          },
        );
       }
      )


    
      }

  }

  todo(){
    window.alert("Not Implemented")
  }

  
  showCuisines(items : any){
    let cuisineRef=this.dialog.open(CuisinesComponent, {data:{items},maxHeight:500});
    cuisineRef.afterClosed().subscribe(result=>{
      console.log("cuisine box result"+result);  
     }
    )
 }

 
}
