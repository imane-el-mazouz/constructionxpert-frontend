import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/enums/role';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  role: Role | null;
  isLoggedIn: boolean = false;


  constructor(private authService: AuthService) {
    this.role = this.authService.getUserRole();
  }

  // logout() {
  //   console.log('Logout clicked');
  //   this.authService.logout();
  // }

  isCustomer(): boolean {
    return this.role === Role.CUSTOMER;
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!this.authService.getToken();
    this.role = this.authService.getUserRole();
  }

  logout(): void {
    console.log('Logout clicked');
    this.authService.logout();
    this.checkLoginStatus();
  }

  login(): void {
    this.authService.logout();
  }
}
