import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { LoginService } from '../login.service';
import { LoginComponent } from '../login/login.component';
import { Restaurant } from '../Restaurants';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {


  restaurntForm: FormGroup;
  url: any;
  cuisineUrl:any;
  selectedValue: string;
  cuisine: FormArray;
  cuisines: FormGroup;
  items: FormArray;
  data: any = [];
  file!: File;
  constructor(private formBuilder: FormBuilder, private adminService: AdminService, private loginService: LoginService, private route: Router) {


    this.restaurntForm = formBuilder.group(
      {
        'restaurantName': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'street': new FormControl(null, [Validators.required]),
        'zipcode': new FormControl(null, [Validators.required]),
        'type': new FormControl(null, [Validators.required]),
        'restImage': new FormControl(''), 
        'items': new FormArray(
          [
            new FormGroup(
              {
                'cuisineName': new FormControl(null, [Validators.required]),
                'price': new FormControl(null, [Validators.required]),
                'rating': new FormControl(null, [Validators.required]),
                'category': new FormControl(null, [Validators.required]),
                'image': new FormControl(null, [Validators.required])
              }
            )
          ]
        )
      }
    );
  }



  ngOnInit(): void {

    this.cuisines = this.formBuilder.group({ items: this.formBuilder.array([this.createItem()]) });

  }

  createItem(): FormGroup {
    return this.formBuilder.group({ cuisineName: '', category: '', rating: '', price: '', image: '' });

  }


  addItem(): void {
    this.items = this.restaurntForm.get('items') as FormArray;
    this.items.push(this.createItem());
    this.data.push({
      cuisineName: this.items.value[this.items.value.length -2].cuisineName,
      category: this.items.value[this.items.value.length -2].category,
      rating: this.items.value[this.items.value.length -2].rating,
      price: this.items.value[this.items.value.length -2].price,
      image: this.cuisineUrl
    });
    console.log(this.data)
  }


  types: Type[] = [
    { value: 'Dine-in', viewValue: 'Dine-in' },
    { value: 'cafe', viewValue: 'Cafe' },
    { value: 'fast-food', viewValue: 'Fastfood' }
  ];


  onRestFileUpload(e: any) {
    if (e.target.files) {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }

  }




  onCuisineFileUpload(cuisineImg: any) {
    if (cuisineImg.target.files) {
      this.file = cuisineImg.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(cuisineImg.target.files[0]);
      console.log(cuisineImg.target.files[0]);
      reader.onload = (event: any) => {
        this.cuisineUrl = event.target.result;
      }
    }
  }

  addField() {
    this.cuisine.push(new FormGroup({
      'cuisineName': new FormControl(''),
      'price': new FormControl(''),
      'rating': new FormControl(''),
      'image': new FormControl('')
    }))
  }

  getCuisine() {
    return this.restaurntForm.get('cuisine') as FormArray
  }

  onSubmit(form: FormGroup) {
    this.addItem()
    this.removeField(this.items.value.length -1)
    let address = {
      street: form.get('street')?.value,
      city: form.get('city')?.value,
      zipCode: form.get('zipcode')?.value,
    }

    let restaurant: Restaurant = {
      restaurantName: form.get('restaurantName')?.value,
      type: form.get('type')?.value,
      address: (address),
      image: this.url,
      cuisines: this.data
      
    }
    console.log(this.data)

    console.log('Restaurant' + JSON.stringify(restaurant));
    this.adminService.addRestaurant(restaurant, localStorage.getItem('email')).subscribe((response: any) => {
      console.log(response);
      window.alert("Restaurant Has been added to Database")
      this.route.navigate(['/toolbar/adminDashboard']);
    }

    )
  }

  getControls() {
    return (this.restaurntForm.get('items') as FormArray);
  }

  removeField(i:any){
    console.log(i);
    let cuisineForm=this.restaurntForm.get('items') as FormArray
    this.data.splice(i,1)
    //delete this.data[i]
    cuisineForm.removeAt(i);
  }
}
