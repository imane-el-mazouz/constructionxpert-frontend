import { Routes } from '@angular/router';
import {LoginComponent} from "./features/auth/login/login.component";
import {SignupComponent} from "./features/auth/signup/signup.component";
import {CustomersManagementComponent} from "./features/dash-admin/customers-management/customers-management.component";
import {authGuard} from "./core/guards/auth.guard";
import {Role} from "./core/enums/role";
import {GuardComponent} from "./features/guard/guard.component";
import {TaskManagementComponent} from "./features/dash-customer/task-management/task-management.component";
import { DashUserComponent } from './features/dash-user/dash-user.component';
import {ResourceManagementComponent} from "./features/dash-customer/resource-management/resource-management.component";
import {ProjectListComponent} from "./features/projects/project-list/project-list.component";
import {HomeComponent} from "./shared/home/home.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'dashboard', component: DashUserComponent
  },
  { path: 'customers', component: CustomersManagementComponent ,canActivate: [authGuard], data: { expectedRole: Role.ADMIN }},
  { path: 'access-denied', component: GuardComponent },
  { path: 'tasks', component: TaskManagementComponent ,canActivate: [authGuard], data: { expectedRole: Role.CUSTOMER } },
  { path: 'resources', component: ResourceManagementComponent ,canActivate: [authGuard], data: { expectedRole: Role.CUSTOMER } },
  { path: 'projects', component: ProjectListComponent ,canActivate: [authGuard], data: { expectedRole: Role.CUSTOMER } },
  { path: '', redirectTo: '/home', pathMatch: 'full' },



];
