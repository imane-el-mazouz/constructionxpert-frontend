import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {SignupComponent} from "./features/auth/signup/signup.component";
import {AdminComponent} from "./features/dash-admin/admin-dash/admin.component";
import {DashCustomerComponent} from "./features/dash-customer/dash-customer/dash-customer.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: AdminComponent },
  { path: 'customer', component: DashCustomerComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }



];
