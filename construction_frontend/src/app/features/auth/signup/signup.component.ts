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
//   signupForm: FormGroup;
//
//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.signupForm = this.fb.group({
//       fullName: ['', Validators.required],
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       role: ['CUSTOMER', Validators.required]
//     });
//   }
//
//   signup(): void {
//
//
//     if (this.signupForm.valid) {
//       const { fullName, username, password, email, role } = this.signupForm.value;
//
//       this.authService.signup(fullName, username, email, password, role).subscribe(
//         () => {
//           this.router.navigate(['/login']);
//         },
//         error => {
//           console.error('Signup failed', error);
//           alert('Signup failed. Please try again.');
//         }
//       );
//     }
//   }
//
// }
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
