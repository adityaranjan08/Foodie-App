import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../customer';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  file!: File;
  registerForm: FormGroup;
  fieldRequired: string = "This field is required"

  url = "./assets/profileInitial.jpg";
  address: any;


  constructor(private registerService: RegisterService, private route: Router) { }

  //  constructor(private fb: FormBuilder,
  //     private registerService: RegisterService, private router: Router){ }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.pattern(emailregex)]),
        'password': new FormControl(null, [Validators.required, this.checkPassword]),
        'houseNo': new FormControl(null, [Validators.required]),
        'street': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'zipcode': new FormControl(null, [Validators.required]),
        'state': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required]),
        'phoneNo': new FormControl(null, [Validators.required]),
      }
    )


  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  //uploading the photo
  onFileUpload(e: any) {
    if (e.target.files) {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
      
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url)
      }

    }

  }






  onRegister() {
    let add = this.address = {
      houseNo: this.registerForm.get('houseNo')?.value,
      street: this.registerForm.get('street')?.value,
      city: this.registerForm.get('city')?.value,
      zipCode: this.registerForm.get('zipcode')?.value,
      state: this.registerForm.get('state')?.value,
      country: this.registerForm.get('country')?.value
    }

    let customer = {
      customerEmailId: this.registerForm.get('email')?.value,
      customerName: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
      customerAddress: add,
      customerPhoneNum: this.registerForm.get('phoneNo')?.value,
    }


    console.log(this.registerForm.value);



    const formData = new FormData();
    formData.append('user', JSON.stringify(customer));
    formData.append('image', this.file, this.file.name);

    this.registerService.registrationFromRemote(formData).subscribe(
      (response) => {
        this.route.navigate(['/toolbar/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
