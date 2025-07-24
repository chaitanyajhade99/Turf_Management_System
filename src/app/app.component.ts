import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service'; // Import ThemeService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser$: Observable<any | null>;
  isDark$: Observable<boolean>; // Add this property

  constructor(
    private authService: AuthService,
    private themeService: ThemeService // Inject ThemeService
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isDark$ = this.themeService.isDark$; // Initialize the property
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
  }
}