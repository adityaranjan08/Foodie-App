import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './auth.guard';
import { AuthorizeGuard } from './authorize.guard';
import { CartComponent } from './cart/cart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'/toolbar',pathMatch:'full'},
  {path:'toolbar', component:ToolbarComponent,
children:[
  { path:'login',component:LoginComponent},
  { path:'register',component:RegisterComponent},
  { path:'adminLogin',component:AdminLoginComponent},
  {path:'cart',component:CartComponent},
  { path:'userdashboard',component:UserDashboardComponent,canActivate:[AuthGuard],
  // children:[
  //   {path:'',canActivateChild:[AuthorizeGuard],
  children:[
    {path:'favorite', component:FavoriteComponent,canActivateChild:[AuthorizeGuard]}
    
   ]},
   {path:'favorite', component:FavoriteComponent},
  {path:'adminDashboard',component:AdminDashboardComponent,canActivate:[AuthGuard],
  // children:[
  //   {path:'',canActivateChild:[AuthorizeGuard],
    children:[
   {path:'addRestaurant', component:AddRestaurantComponent,canActivateChild:[AuthorizeGuard]}
    ]},
  {path:'addRestaurant', component:AddRestaurantComponent},
  {path:'home', component:HomeComponent}
]}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
   exports: [RouterModule]
})
export class AppRoutingModule { }
