import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from '../cart.service';
import { CustomerService } from '../customer.service';

import { RestaurantComplete } from '../Restaurants';
import { CartComponent } from '../cart/cart.component';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-cuisines',
  templateUrl: './cuisines.component.html',
  styleUrls: ['./cuisines.component.css']
})
export class CuisinesComponent implements OnInit {


  favCuisine:any=[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService
  , public route :Router, private toast:NgToastService, private cartService:CartService,
 private favService:FavoriteService, private dialog: MatDialog) { }

  ngOnInit(): void{

   this.getFavCuisine();

  }

  addFavorite(restaurant: any, item: any) {
    
    this.toast.success({summary:"Added To favourites",duration:5000})
    let cus =  [{cuisineId: item.cuisineId, cuisineName: item.cuisineName,
    price: item.price, rating: item.rating, image: item.image}]
    let rest = {
      restaurantId: restaurant.restaurantId,
      restaurantName: restaurant.restaurantName,
      address: {
                   city: restaurant.address.city, 
                   street: restaurant.address.street,   
                   zipCode: restaurant.address.zipCode,                               
             },
    type: restaurant.type,
    image: restaurant.image,
    cuisines: cus
    }
    console.log(restaurant);
    
    this.customerService.addFavorite(rest, localStorage.getItem("email")).subscribe(
      (d:any)=>{ 
        
        console.log(d)
      }
    )
  }


  addtoCart(item:any){
    this.cartService.addtoCart(item);
    this.toast.success({summary:"Added To Cart",duration:5000})
  }


  getFavCuisine()
  {
    this.favService.getFavorite(localStorage.getItem("email")).subscribe(
      (data:any)=> {this.favCuisine = data?.find((res:any)=>res.restaurantName.toLowerCase()===this.data.items.restaurantName.toLowerCase())?.cuisines || []
      console.log("fav"+JSON.stringify(this.favCuisine))
      console.log(this.data.items.restaurantName)}
    )
  }

  hasFavCus(cName:string)
  {
     return this.favCuisine.find((x:any)=>x.cuisineName.toLowerCase()===cName.toLowerCase());
  }

  deleteFav( cuisineName:string, restaurant:any)
  {
      this.favService.deleteFav(cuisineName, restaurant.restaurantId).subscribe(
        (d:any)=> {console.log(JSON.stringify(d));
          this.dialog.closeAll();
          this.toast.success({summary:"Removed",duration:5000})
          this.route.routeReuseStrategy.shouldReuseRoute = function ()
       {
        return false;
      }

        this.route.navigate(["toolbar/favorite"]);
      }
      )
          
  }

}
