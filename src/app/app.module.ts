import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AdminService } from './admin.service';
import { HomeComponent } from './home/home.component';
import {MatSelectModule} from '@angular/material/select';
import { FavoriteComponent } from './favorite/favorite.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTooltipModule}  from '@angular/material/tooltip';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import {MatRadioModule} from '@angular/material/radio';
import { CuisinesComponent } from './cuisines/cuisines.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
import {NgxPaginationModule} from 'ngx-pagination';
import { CartComponent } from './cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    HomeComponent,
    FavoriteComponent,
    AddRestaurantComponent,
    CuisinesComponent,
    CartComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatRadioModule,
    NgToastModule,
    NgxPaginationModule,
    MatBadgeModule
    
  ],
  providers: [LoginService,RegisterService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
