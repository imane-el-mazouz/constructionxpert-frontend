import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    this.http.post<{ accessToken: string, user: { role: string } }>('http://localhost:8080/api/auth/login', { email, password })
      .subscribe(
        response => {
          this.authService.setToken(response.accessToken);

          if (response.user.role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else if (response.user.role === 'CUSTOMER') {
            this.router.navigate(['/customer'])

          } else {
            this.errorMessage = 'role undefined: ' + response.user.role;
          }
        },
        error => {
          console.error('Error during login', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      );
  }

}
