import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'] 
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // 2. Initialize the form
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 3. Define the missing onSubmit method
  onSubmit(): void {
    if (this.registerForm.valid) {
      const success = this.authService.register(this.registerForm.value);
      if (success) {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      } else {
        this.error = 'An account with this email already exists.';
      }
    }
  }
}