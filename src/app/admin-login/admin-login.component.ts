import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import {NgToastService} from "ng-angular-popup"


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loggedInEmailId!:string; 
  loginForm: FormGroup;
  errorMessage:any;
  constructor(private fb: FormBuilder,private loginService: LoginService, 
    private router: Router,  private toast: NgToastService) { }

  ngOnInit() {
    this.createForm();
   }
 
   createForm()
   {
     this.loginForm = new FormGroup({
       'email': new FormControl(null),
       'pwd': new FormControl(null)
     })
   }
   

   adminLogin()
   {
    console.log(this.loginForm.value)
    this.loginService.loginFromRemote(this.loginForm.value).subscribe(
      (data: any) => {
        
        this.loginService.loginUser(data.userInfo.token)
        console.log("token"+data.userInfo.token);
        console.log("loggedIn emailId ...."+this.loginForm.value.email);
        this.loggedInEmailId=this.loginForm.value.email;
       localStorage.setItem("email",this.loggedInEmailId);
      
        if(data.userInfo.role == "ADMIN")
        { 
          this.loginService.loggedIn=true;
          this.router.navigate(['/toolbar/adminDashboard']);
          this.toast.success({summary:"Login successful",duration:7000})
        }
        else
        {
          this.toast.error({ summary:"Invalid Credentials",duration:7000})
        }

      },
      (error: any) => {
        this.errorMessage = error;
        console.log("error occured"+JSON.stringify(error));  
        this.toast.error({ summary:"Invalid Credentials",duration:7000})
        this.createForm();
      }
    )
  }


 }



