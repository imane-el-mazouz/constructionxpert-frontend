import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {AuthenticationRequest} from "../../../core/models/authentication-request";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {User} from "../../../core/models/user";
import {response} from "express";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatLabel,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  // loginForm: FormGroup;
  // errorMessage: string = '';
  //
  // form = this.fb.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required]
  // });
  // authRequest: AuthenticationRequest = { username: '', password: '' };
  //
  // constructor(
  //   private fb: FormBuilder,
  //   private http: HttpClient,
  //   private authService: AuthService,
  //   private router: Router
  // ) {
  //   this.loginForm = this.fb.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });
  // }
  //
  // ngOnInit(): void {
  //   }
  //
  // login(): void {
  //
  //   this.authRequest.username=this.loginForm.get('username')?.value!;
  //   this.authRequest.password=this.loginForm.get('password')?.value!;
  //
  //   this.authService.login(this.authRequest).subscribe(
  //       response => {
  //         this.authService.setToken(response.accessToken);
  //
  //         if (response.user.role === 'ADMIN') {
  //           this.router.navigate(['/dashboard']);
  //         } else if (response.user.role === 'CUSTOMER') {
  //           this.router.navigate(['/customer'])
  //
  //         } else {
  //           this.errorMessage = 'role undefined: ' + response.user.role;
  //         }
  //       },
  //       error => {
  //         console.error('Error during login', error);
  //         this.errorMessage = 'Login failed. Please check your credentials and try again.';
  //       }
  //     );
  // }
  authRequest: AuthenticationRequest = {
    userNameOrEmail: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // onLogin(): void {
  //   this.authService.login(this.authRequest).subscribe({
  //     next: (response) => {
  //       this.authService.setToken(response.token);
  //       this.authService.setUserRole(response.role);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Invalid login credentials.';
  //     }
  //   });
  // }





  login(): void {
    this.authService.login(this.authRequest).subscribe(
      response => {
        const { token, role } = response;
        this.authService.setToken(token);

        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'CUSTOMER') {
          this.router.navigate(['/customer']);
        } else {
          this.errorMessage = 'Role undefined: ' + role;
        }
      },
      error => {
        this.errorMessage = 'Login failed: ' + error.message;
      }
    );
  }


  ngOnInit(): void {
  }
}
