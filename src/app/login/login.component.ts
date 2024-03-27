import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { LoginService } from '../login.service';
import {NgToastService} from "ng-angular-popup"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedInEmailId!:string; 
  loginForm: FormGroup;
  errorMessage!: string;
  constructor(private fb: FormBuilder,private logService: LoginService,private router: Router, private customerService: CustomerService,
    private toast: NgToastService) 
    {}

  ngOnInit() {
    this.createForm();
    
   }
 
   createForm(){
     this.loginForm = new FormGroup({
       'email': new FormControl(null,[Validators.required]),
       'pwd': new FormControl(null,[Validators.required])
     })
   }
   
  

  login(){
    
    this.logService.loginFromRemote(this.loginForm.value).subscribe(
      (data: any) => {
       
        this.logService.loginUser(data.userInfo.token)
        console.log("token"+data.userInfo.token);
        console.log("loggedIn emailId ...."+this.loginForm.value.email);
        this.loggedInEmailId=this.loginForm.value.email;
        localStorage.setItem("email",this.loggedInEmailId);
        if(data.userInfo.role == "CUSTOMER"){
          this.logService.profilePic=data.profilePic.profilePic
          console.log("profile pic*********"+this.logService.profilePic)
          localStorage.setItem('image',this.logService.profilePic)
          this.customerService.restaurants=null;


          



          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }
          this.router.navigate(['/toolbar','userdashboard']);
         
          this.toast.success({summary:"Login successful",duration:5000})
        }else
        {
          this.toast.error({summary:"Invalid Credentials",duration:5000})
          
        }
 

      },
      (error: any) => {
        this.errorMessage = error;
        console.log("error occuredddddddddddddddddd"+JSON.stringify(error));
        this.toast.error({detail:"Login Status", summary:"Invalid User",duration:5000}) 
       // window.alert("Invalid Credentials")
        this.createForm(); 
      }
    )
  }
  // public getCity()
  // {  
    
  //    this.customerService.getCustomerDetails().subscribe(
  //      (response:any)=>{
  //       console.log("response of get city"+JSON.stringify(response));
  //       localStorage.setItem('city',response.customerAddress.city);
  //      }
  //    )
  // }
  
}
