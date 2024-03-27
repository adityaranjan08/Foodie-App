import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../favorite.service';
import { RestaurantComplete } from '../Restaurants';
import { CuisinesComponent } from '../cuisines/cuisines.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {NgToastService} from "ng-angular-popup"

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  imageBase64String:any;
  restaurants: RestaurantComplete[];
  imageUrl:any;
  constructor(private favService: FavoriteService,
    private dialog: MatDialog, private route:Router, private toast: NgToastService) { }

  ngOnInit(): void {
    this.favService.getFavorite(localStorage.getItem("email")).subscribe(
      (data:any)=> 
      {
        this.restaurants = data;
        if(data===null)
        { 
           
          this.toast.error({summary:"No Favourites Available",duration:5000})
          this.route.navigate(['/toolbar/userdashboard']);
        }
      }
    )
  }

  todo(){
    window.alert("Not Implemented")
  }

  showCuisines(items : any){
    let cuisineRef=this.dialog.open(CuisinesComponent, {data:{items}});
    cuisineRef.afterClosed().subscribe(result=>{
      console.log("cuisine box result"+result);  
     }
    )
 }

}
