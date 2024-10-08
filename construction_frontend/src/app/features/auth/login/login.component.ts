import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthenticationRequest } from '../../../core/models/authentication-request';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    NgIf,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const authRequest: AuthenticationRequest = {
      userNameOrEmail: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.authService.login(authRequest).subscribe(
      response => {
        const { token, role } = response;
        this.authService.setToken(token);

        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = `Role undefined: ${role}`;
        }
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed: ' + error.message;
      }
    );
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }
}
