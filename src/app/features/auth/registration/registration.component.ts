import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;

  onSubmit() {
    this.errorMessage = null;
    this.authService.register(this.credentials).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/transactions']);
        } else {
          this.errorMessage = 'Registration succeeded, but no token received';
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = err.status === 0
          ? 'Unable to connect to the server (CORS or network issue)'
          : err.error?.message || 'Registration failed';
      },
    });
  }
}