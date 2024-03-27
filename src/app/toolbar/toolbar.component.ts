import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../customer.service';
import { LoginService } from '../login.service';
import { SearchService } from '../search.service';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { RestaurantComplete } from '../Restaurants';
import { AdminService } from '../admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../cart.service';


interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})


export class ToolbarComponent implements OnInit {


  imageBase64String:any;
  imageUrl:any;
  email:any;
  totalItem:number=0;

  isloggedIn:Boolean=false;
  constructor(private loginService:LoginService, public route: Router, private searchService: SearchService, private customerService: CustomerService, 
    private adminService:AdminService,private sanitizer: DomSanitizer, 
    private dialog:MatDialog, private cartService:CartService) { 
    this.isloggedIn=this.loginService.loggedIn;
  
  }

  myControl = new FormControl();
  options: string[] = ['Butter Chicken',
  'Chicken Biryani', 'Puri Sabji', 'Jalebi',
  'Masala Dosa','Idly','White Sauce Pasta',
  'Jain Thali'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {

    this.updatecart();

    this.imageBase64String= 'data:image/jpg;base64,'+localStorage.getItem('image')
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.imageBase64String);
    console.log("email######"+localStorage.getItem('email'))
    this.email=localStorage.getItem('email')
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    console.log(this.myControl?.value)
   
  }

  private _filter(value: string): string[] {
    const filterValue = value;

    return this.options.filter(option => option.includes(filterValue));
  }

  logout()
  {
       this.isloggedIn=false;
       this.loginService.logout();
       this.route.navigate(["toolbar"])


  }

  selectedValue: string;

  cities: City[] = [
    {value:'clearfilter', viewValue:'Clear Filter'},
    {value: 'Patna', viewValue: 'Patna'},
    {value: 'Ujjain', viewValue: 'Ujjain'},
    {value: 'Dehradun', viewValue: 'Dehradun'},
   
  ];

  
  searchByCity(city: string){
    this.customerService.city=city;
    if(city==='clearfilter')
    { 
      this.customerService.restaurants=null;
      this.route.routeReuseStrategy.shouldReuseRoute = function ()
       {
        return false;
      }
      if(this.route.url==='/toolbar/userdashboard')
      
        this.route.navigate(["/toolbar/userdashboard"])

        else
        {
          this.route.navigate(["/toolbar"])
        }
    }
      else
      {
    this.searchService.searchByCity(city).subscribe(
        (rests: any)=> {
          this.customerService.restaurants = rests,
          this.route.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
          if(this.route.url==='/toolbar/userdashboard')
          
            this.route.navigate(["/toolbar/userdashboard"])

            else
            {
              this.route.navigate(["/toolbar"])
            }
           

        }
    )
  }
}

getbyCuisine(option:any)
{    
  let restaurant:RestaurantComplete[]=[];
     console.log("in meth")
     console.log(option);
     this.searchService.searchByCity(this.customerService.city).subscribe(
      (rests: any)=> {
        this.customerService.restaurants = rests
      });
     if(this.customerService.restaurants!=null && this.customerService.city!=null) {
        let temp=this.customerService.restaurants;
        console.log(temp);
        for(let i of temp){
          for(let j of i.cuisines){
            console.log(j.cuisineName);
            if(j.cuisineName==option)
            restaurant.push(i)
          }
        }
        console.log(restaurant)
        this.customerService.restaurants=restaurant;
        this.route.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
      }
        if(this.route.url==='/toolbar/userdashboard')
        
          this.route.navigate(["/toolbar/userdashboard"])

          else
          {
            this.route.navigate(["/toolbar"])
          }
     }
     else{
      this.adminService.getRestaurants().subscribe (
        (data: any) =>{
          let temp:RestaurantComplete[]|null=data;
          console.log(temp);
          for(let i of temp!!){
            for(let j of i.cuisines){
              console.log(j.cuisineName);
              if(j.cuisineName==option)
              restaurant.push(i)
            }
          }
          console.log(restaurant)
          this.customerService.restaurants=restaurant;
          this.route.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
          if(this.route.url==='/toolbar/userdashboard')
          
            this.route.navigate(["/toolbar/userdashboard"])
  
            else
            {
              this.route.navigate(["/toolbar"])
            }
          },
      );
     }
     

     
}


showFav(){
  this.route.navigate(["/toolbar/favorite"])
}


  viewCart(){
    let cuisnedata=this.cartService.cartItemList
    let cuisineRef=this.dialog.open(CartComponent, {data:{cuisnedata}});
    cuisineRef.afterClosed().subscribe(result=>{
      this.updatecart();
    console.log("cuisine box result"+result);  
    }
  )
}

updatecart()
{
  this.cartService.getCuisines().subscribe(
    (response:any)=>{
      this.totalItem=response.length;
    }
   )
}
}
