import {CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Role} from "../enums/role";

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data['expectedRole'] as Role;
    const userRole = this.authService.getPersonRole();

    if (userRole && userRole === expectedRole) {
      return true;
    } else {
      this.router.navigate(['access-denied']);
      return false;
    }
  }
}
