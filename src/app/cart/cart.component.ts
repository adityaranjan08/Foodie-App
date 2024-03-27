import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import {NgToastService} from "ng-angular-popup"


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  private cartService:CartService, private route:Router, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  remove(cuisine:any)
  {
     this.cartService.removeCartItem(cuisine)
  }
  
  order()
  {
     
     this.toast.success({summary:"Order Has been Placed",duration:7000});
     this.cartService.removeAllCart();
    
  }
}
