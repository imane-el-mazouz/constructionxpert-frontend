import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['CUSTOMER', Validators.required]
    });
  }

  signup(): void {


    if (this.signupForm.valid) {
      const { fullName, username, password, email, role } = this.signupForm.value;

      this.authService.signup(fullName, username, email, password, role).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed', error);
          alert('Signup failed. Please try again.');
        }
      );
    }
  }

}
