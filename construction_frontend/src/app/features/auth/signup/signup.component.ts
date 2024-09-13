import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {User} from "../../../core/models/user";
import {NgIf} from "@angular/common";
import {Role} from "../../../core/enums/role";
import {MatFormField} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatFormField,
    MatButtonModule,
    MatInputModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardModule
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: Role.CUSTOMER

  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {
    this.authService.signup(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'An error occurred during signup.';
      }
    });
  }
}
