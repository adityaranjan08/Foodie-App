import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []
  public cuisineList = new BehaviorSubject<any>([])

  constructor() { }

  getCuisines(){
   return this.cuisineList.asObservable();
  }

  setCuisines(product: any){
    this.cartItemList.push(...product);
    this.cuisineList.next(product);
  }

  addtoCart(cuisine : any){
    this.cartItemList.push(cuisine);
    this.cuisineList.next(this.cartItemList);
    console.log(this.cartItemList)
  }

  getTotalPrice(){
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id===a.id){
        this.cartItemList.splice(index,1);
      }
    })
  }

  removeAllCart(){
    console.log("in remove all")
    this.cartItemList = []
    this.cuisineList.next(this.cartItemList);
     this.getCuisines();
  }
}
